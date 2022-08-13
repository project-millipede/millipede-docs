import { APP_CONTENT_HEADER_HEIGHT } from '@app/layout';
import { RenderUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { GuardUtil, I18n } from '@app/utils';
import { Close, Share as ShareIcon } from '@mui/icons-material';
import { CloseReason, OpenReason, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { windowOpenPromise } from '@vangware/window-open-promise';
import copy from 'copy-to-clipboard';
import { Translate } from 'next-translate';
import { FC, SyntheticEvent, useCallback, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';

import { features } from '../features';
import useDisclosure from './hooks/use-disclosure';
import { Icon } from './Icon';
import {
  Interaction,
  InteractionMenuItem,
  URIPathParamsFacebook,
  URIPathParamsLinkedIn,
  URIPathParamsMail,
  URIPathParamsTwitter,
  URIPathParamsWhatsApp,
} from './types';
import { objectToGetParams } from './utils';

const { isString } = GuardUtil.Primitives;

export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  '&.MuiSpeedDial-root': {
    '&.MuiSpeedDial-directionDown': {
      position: 'relative',
      height: theme.spacing(APP_CONTENT_HEADER_HEIGHT),
      width: theme.spacing(APP_CONTENT_HEADER_HEIGHT)
      // Option:
      // When the share-component gets used next to the h1 element
      // margin: theme.spacing(2.75, 2, 2.75)
      // Note:
      // When the share-component gets used next to the h1 element the h1 element style needs to set lineHeight: 'inherit'
    },
    '& .MuiSpeedDial-fab': {
      minHeight: theme.spacing(APP_CONTENT_HEADER_HEIGHT)
    }
  }
}));

export const NoTransition: FC<TransitionProps> = props => {
  const { children, in: inProp } = props;
  if (!inProp) {
    return null;
  }
  return children as any;
};

const getConnectionData = (
  meta: PageTypes.MetaData,
  url: string,
  t: Translate
) => {
  const { title, description, hashTags } = meta;

  const hashtagCollection = isString(hashTags) ? hashTags.split(', ') : [];

  const [firstHashtag] = hashtagCollection;

  return [
    {
      id: 'copy-link',
      type: Interaction.SHARE_LOCAL,
      title: t('common:copy-link'),
      url: ''
    },
    {
      id: 'mail',
      type: Interaction.SHARE_MAIL,
      title: `${t('common:share-via')} Mail`,
      url: 'mailto://',
      params: {
        subject: title,
        body: description
      } as URIPathParamsMail
    },
    {
      id: 'facebook',
      type: Interaction.SHARE,
      title: `${t('common:share-on')} Facebook`,
      url: 'https://www.facebook.com/sharer/sharer.php',
      params: {
        u: url,
        hashtag: `#${firstHashtag}`,
        quote: title
      } as URIPathParamsFacebook
    },
    {
      id: 'twitter',
      type: Interaction.SHARE,
      title: `${t('common:share-on')} Twitter`,
      url: 'https://twitter.com/share',
      params: {
        url,
        text: title,
        hashtags: hashtagCollection
      } as URIPathParamsTwitter
    },
    {
      id: 'linkedin',
      type: Interaction.SHARE,
      title: `${t('common:share-on')} LinkedIn`,
      url: 'https://linkedin.com/shareArticle',
      params: {
        url,
        title,
        summary: description,
        source: t('common:application-title'),
        mini: true
      } as URIPathParamsLinkedIn
    },
    {
      id: 'whatsapp',
      type: Interaction.SHARE,
      title: `${t('common:share-on')} Whatsapp`,
      url: 'https://web.whatsapp.com/send',
      params: {
        text: title ? `${title} | ${url}` : `${url}`
      } as URIPathParamsWhatsApp
    }
  ];
};

const createNewTab = async (
  url: string,
  handleClose: (type?: Interaction) => void
) => {
  const windowOpen = windowOpenPromise(window);

  const newWindow = await windowOpen({
    url,
    target: '_blank'
  });
  newWindow.addEventListener('beforeunload', _event => {
    handleClose();
  });
  newWindow.focus();
};

const setupConnection = (
  url: string,
  handleClose: (type: Interaction) => void,
  { id, type, title, url: providerUrl, params }: InteractionMenuItem
) => {
  if (type === Interaction.SHARE_LOCAL) {
    return {
      title,
      icon: <Icon id={id} />,
      action: () => {
        copy(url);
        handleClose(Interaction.SHARE_LOCAL);
      }
    };
  }
  return {
    title,
    icon: <Icon id={id} />,
    action: () => {
      createNewTab(`${providerUrl}${objectToGetParams(params)}`, handleClose);
    }
  };
};

interface ShareProps {
  metaData: PageTypes.MetaData;
}

export const Share: FC<ShareProps> = ({ metaData }) => {
  const {
    notification: {
      states: { notificationState }
    }
  } = features;

  const url = RenderUtils.isBrowser() && window.location.href;
  const supportWebShare = RenderUtils.supportWebShare();

  const { t } = I18n.useTranslation();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const setNotification = useSetRecoilState(notificationState);

  const handleShareOpen = (
    _event: SyntheticEvent<HTMLDivElement, Event>,
    _reason: OpenReason
  ) => {
    onOpen();
  };

  const handleShareClose = (
    _event: SyntheticEvent<HTMLDivElement, Event>,
    _reason: CloseReason
  ) => {
    onClose();
  };

  const handleWebShareClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    shareWithWebShare();
  };

  const handleCloseWithFeedback = (type?: Interaction) => {
    onClose();
    if (type === Interaction.SHARE_LOCAL) {
      setNotification(state => {
        return {
          ...state,
          isActive: true,
          message: t('common:link-copied')
        };
      });
    }
  };

  const connections = useMemo(() => {
    const data = getConnectionData(metaData, url, t);
    return data.map(d => {
      return setupConnection(url, handleCloseWithFeedback, d);
    });
  }, [url]);

  const shareWithWebShare = useCallback(async () => {
    const { title, description } = metaData;

    const shareData: ShareData = {
      title,
      text: description,
      url
    };
    try {
      await window.navigator.share(shareData);
    } catch (e) {
      console.warn(e);
    }
  }, [url]);

  return (
    <StyledSpeedDial
      ariaLabel={t('common:share-post')}
      icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<Close />} />}
      onClose={!supportWebShare && handleShareClose}
      onOpen={!supportWebShare && handleShareOpen}
      onClick={handleWebShareClick}
      open={isOpen}
      direction='down'
      TransitionComponent={NoTransition}
      transitionDuration={0}
    >
      {connections.map(({ title, icon, action }) => {
        return (
          <SpeedDialAction
            key={title}
            icon={icon}
            tooltipTitle={title}
            onClick={action}
            tooltipPlacement='left'
          />
        );
      })}
    </StyledSpeedDial>
  );
};
