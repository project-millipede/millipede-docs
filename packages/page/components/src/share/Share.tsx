import { APP_CONTENT_HEADER_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { RenderUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { StringUtil } from '@app/utils';
import { notificationStates } from '@demonstrators-social/shared';
import { Close, Share as ShareIcon } from '@mui/icons-material';
import { CloseReason, OpenReason, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { windowOpenPromise } from '@vangware/window-open-promise';
import copy from 'copy-to-clipboard';
import isArray from 'lodash/isArray';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, SyntheticEvent, useCallback, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';

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
  meta: PageTypes.ContentMetaData,
  url: string,
  t: Translate
) => {
  const { title, description, hashtags } = meta;

  const hashtagCollection = isArray(hashtags)
    ? hashtags
    : StringUtil.stringToArray(hashtags);

  const firstHashtag = hashtagCollection
    .filter((_hashTag, index) => index === 0)
    .map(hashTag => `#${hashTag}`)
    .join('');

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
        hashtag: firstHashtag,
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
  metaData: PageTypes.ContentMetaData;
}

export const Share: FC<ShareProps> = ({ metaData }) => {
  const url = RenderUtils.isBrowser() && window.location.href;
  const supportWebShare = RenderUtils.supportWebShare();

  const { t } = useTranslation();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const {
    notification: { snackbarState }
  } = notificationStates;

  const setSnackbar = useSetRecoilState(snackbarState);

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
      setSnackbar(state => {
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
            tooltipPlacement={'left'}
          />
        );
      })}
    </StyledSpeedDial>
  );
};
