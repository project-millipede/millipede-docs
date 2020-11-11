import { createStyles, Fade, makeStyles, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import { Close as CloseIcon, Share as ShareIcon } from '@material-ui/icons';
import { windowOpenPromise } from '@vangware/window-open-promise';
import copy from 'copy-to-clipboard';
import _ from 'lodash';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { FC, SyntheticEvent, useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';

import {
  Interaction,
  InteractionMenuItem,
  MetaProps,
  URIPathParamsFacebook,
  URIPathParamsLinkedIn,
  URIPathParamsMail,
  URIPathParamsTwitter,
  URIPathParamsWhatsApp,
} from '../../../../../../src/typings/share';
import { StringUtil } from '../../../utils';
import { objectToGetParams } from '../../../utils/social/objectToGetParams';
import Icon from './Icon';

const isBrowser = typeof window !== 'undefined';

export interface ShareProps {
  meta: MetaProps;
  url: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    speedDial: {
      height: '56px',
      paddingTop: '8px',
      '&.MuiSpeedDial-directionDown': {
        display: 'unset',
        flexDirection: 'unset'
      }
    }
  })
);

const getSharing = (
  getShareProps: () => ShareProps,
  baseUrl: string,
  t: Translate
) => {
  const { meta } = getShareProps();
  const { title, description, hashtags } = meta;

  const hashtagCollection = _.isArray(hashtags)
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
        u: baseUrl,
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
        url: baseUrl,
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
        url: baseUrl,
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
      url: isMobile
        ? `https://api.whatsapp.com/send`
        : `https://web.whatsapp.com/send`,
      params: {
        text: title ? `${title} | ${baseUrl}` : `${baseUrl}`
      } as URIPathParamsWhatsApp
    }
  ];
};

const createNewTab = async (
  newUrl: string,
  hideSpeedDial: (type?: Interaction) => void
) => {
  const windowOpen = windowOpenPromise(window);

  const newWindow = await windowOpen({
    url: newUrl,
    target: '_blank'
  });
  newWindow.addEventListener('beforeunload', _event => {
    hideSpeedDial();
  });
  newWindow.focus();
};

const createObjects = (
  baseUrl: string,
  hideSpeedDial: (type: Interaction) => void
) => ({ id, type, title, url, params }: InteractionMenuItem) => {
  if (type === Interaction.SHARE_LOCAL) {
    return {
      title,
      icon: <Icon id={id} />,
      action: () => {
        copy(baseUrl);
        hideSpeedDial(Interaction.SHARE_LOCAL);
      }
    };
  }
  return {
    title,
    icon: <Icon id={id} />,
    action: () => {
      createNewTab(`${url}${objectToGetParams(params)}`, hideSpeedDial);
    }
  };
};

const creataShareLink = ({ title, icon, action }) => (
  <SpeedDialAction
    key={title}
    icon={icon}
    tooltipTitle={title}
    onClick={action}
    tooltipPlacement={'left'}
  />
);

const createButtons = (
  hideSpeedDial: (type: Interaction) => void,
  getShareProps: () => ShareProps,
  t: Translate
) => {
  let baseUrl = '';

  if (isBrowser) {
    const url = document.URL.replace(/#.*$/, '');
    // baseUrl = typeof share === 'string' ? `${url}/#${share}` : url;
    baseUrl = url;
  }

  const buttonsInfo = getSharing(getShareProps, baseUrl, t).map(
    createObjects(baseUrl, hideSpeedDial)
  );

  return buttonsInfo.map(creataShareLink);
};

const Share: FC<MetaProps> = props => {
  const classes = useStyles();

  const { t } = useTranslation();

  const router = useRouter();

  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const [feedback, setFeedback] = useState({
    open: false,
    message: ''
  });

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleSpeedDialCloseWithFeedback = (type?: Interaction) => {
    setSpeedDialOpen(false);

    if (type === Interaction.SHARE_LOCAL) {
      setFeedback({
        open: true,
        message: t('common:link-copied')
      });
    }
  };

  const handleFeedbackClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setFeedback({ open: false, message: '' });
  };

  const getShareProps = useCallback(() => {
    return {
      meta: props,
      url: router.pathname
    };
  }, [router.pathname, props.title]);

  return (
    <>
      <SpeedDial
        ariaLabel={t('common:share-post')}
        icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<CloseIcon />} />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
        direction='down'
        className={classes.speedDial}
      >
        {createButtons(handleSpeedDialCloseWithFeedback, getShareProps, t)}
      </SpeedDial>
      <Snackbar
        open={feedback.open}
        TransitionComponent={Fade}
        message={feedback.message}
        autoHideDuration={3000}
        onClose={handleFeedbackClose}
      />
    </>
  );
};

export default Share;
