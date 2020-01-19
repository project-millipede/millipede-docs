import { createStyles, Fade, makeStyles, Snackbar, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import windowOpenPromise from '@vangware/window-open-promise';
import copy from 'copy-to-clipboard';
import _ from 'lodash';
import { TFunction } from 'next-i18next-serverless';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { useTranslation } from '../../../../../../i18n';
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

const useStyles = makeStyles((_theme: Theme) =>
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
  t: TFunction
) => {
  const { meta } = getShareProps();
  const { title, description, keywords } = meta;

  const hashTags = _.isArray(keywords)
    ? keywords
    : StringUtil.stringToArray(keywords);

  const firstHashTag = hashTags
    .filter((_hashTag, index) => index === 0)
    .map(hashTag => `#${hashTag}`)
    .join('');

  return [
    {
      id: 'copy-link',
      type: Interaction.SHARE_LOCAL,
      title: t('copy-link'),
      url: ''
    },
    {
      id: 'mail',
      type: Interaction.SHARE_MAIL,
      title: `${t('share-via')} Mail`,
      url: 'mailto://',
      params: {
        subject: title,
        body: description
      } as URIPathParamsMail
    },
    {
      id: 'facebook',
      type: Interaction.SHARE,
      title: `${t('share-on')} Facebook`,
      url: 'https://www.facebook.com/sharer/sharer.php',
      params: {
        u: baseUrl,
        hashtag: firstHashTag,
        quote: title
      } as URIPathParamsFacebook
    },
    {
      id: 'twitter',
      type: Interaction.SHARE,
      title: `${t('share-on')} Twitter`,
      url: 'https://twitter.com/home?status',
      params: {
        url: baseUrl,
        via: baseUrl,
        text: title,
        hashtags: hashTags,
        mini: true
      } as URIPathParamsTwitter
    },
    {
      id: 'linkedin',
      type: Interaction.SHARE,
      title: `${t('share-on')} LinkedIn`,
      url: 'https://www.linkedin.com/shareArticle',
      params: {
        url: baseUrl,
        source: baseUrl,
        summary: title,
        mini: true
      } as URIPathParamsLinkedIn
    },
    {
      id: 'whatsapp',
      type: Interaction.SHARE,
      title: `${t('share-on')} Whatsapp`,
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
  const newWindow = await windowOpenPromise({
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
  t: TFunction
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
  const classes = useStyles({});

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
        message: t('link-copied')
      });
    }
  };

  const handleFeedbackClose = (
    _event?: React.SyntheticEvent,
    reason?: string
  ) => {
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
        ariaLabel={t('share-post')}
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
