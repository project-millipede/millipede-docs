import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { TFunction } from 'next-i18next-serverless';
import { useRouter } from 'next/router';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import {
  Interaction,
  InteractionMenuItem,
  SocialData,
  URIPathParamsFacebook,
  URIPathParamsLinkedIn,
  URIPathParamsMail,
  URIPathParamsTwitter,
  URIPathParamsWhatsApp,
} from '../../../../../../src/typings/share/social';
import { objectToGetParams } from '../../../utils/social/objectToGetParams';
import Icon from './Icon';
import Modal from './Modal';

const isBrowser = typeof window !== 'undefined';

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

export interface MarkupProps {
  sharingOpen: boolean;
  modal: string;
  toggleModal: (baseURL: string) => void;
  toggleSharingOpen: () => void;
  id: string;
  share: string;
}

const getSharing = (data: SocialData, t: TFunction) => {
  const { baseUrl, share, hashTags } = data;

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
      title: `${t('share-on')} Mail`,
      url: 'mailto://',
      params: {
        subject: share,
        body: share
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
        quote: share
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
        text: share,
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
        summary: share,
        mini: true
      } as URIPathParamsLinkedIn
    },
    {
      id: 'whatsapp',
      type: Interaction.SHARE,
      title: `${t('share-on')} Whatsapp`,
      url: isMobile ? `https://api.whatsapp.com/send` : `https://web.whatsapp.com/send`,
      params: {
        text: share ? `${share} | ${baseUrl}` : `${baseUrl}`
      } as URIPathParamsWhatsApp
    }
  ];
};

const createNewTab = newUrl => {
  const { focus } = window.open(newUrl, '_blank');
  return focus();
};

const createObjects = (
  baseUrl: string,
  toggleModal: (baseURL: string) => void,
  toggleSharingOpen: () => void
) => ({ id, type, title, url, params }: InteractionMenuItem) => {
  if (type === Interaction.SHARE_LOCAL) {
    return {
      title,
      icon: <Icon id={id} />,
      action: () => {
        toggleSharingOpen();
        toggleModal(baseUrl);
      }
    };
  }
  if (type === Interaction.SHARE_MAIL) {
    return {
      title,
      icon: <Icon id={id} />,
      action: () => {
        toggleSharingOpen();
        createNewTab(`${url}${objectToGetParams(params)}`);
      }
    };
  }

  return {
    title,
    icon: <Icon id={id} />,
    action: () => {
      toggleSharingOpen();
      createNewTab(`${url}${objectToGetParams(params)}`);
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
  toggleModal: (baseURL: string) => void,
  toggleSharingOpen: () => void,
  share: string,
  t: TFunction
) => {
  let baseUrl = '';

  if (isBrowser) {
    const url = document.URL.replace(/#.*$/, '');
    baseUrl = typeof share === 'string' ? `${url}/#${share}` : url;
  }

  const data: SocialData = {
    baseUrl,
    share,
    hashTags: ['hashTag']
  };

  const buttonsInfo = getSharing(data, t).map(
    createObjects(baseUrl, toggleModal, toggleSharingOpen)
  );

  return buttonsInfo.map(creataShareLink);
};

const Markup = ({ sharingOpen, toggleSharingOpen, toggleModal, modal }: MarkupProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const classes = useStyles({});

  return (
    <React.Fragment>
      <SpeedDial
        ariaLabel={t('share-post')}
        icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<CloseIcon />} />}
        onClick={toggleSharingOpen}
        onClose={toggleSharingOpen}
        onMouseEnter={toggleSharingOpen}
        onMouseLeave={toggleSharingOpen}
        open={sharingOpen}
        direction='down'
        className={classes.speedDial}
      >
        {createButtons(toggleModal, toggleSharingOpen, router.pathname, t)}
      </SpeedDial>
      <Modal open={!!modal} closeModal={() => toggleModal(null)} url={modal} />
    </React.Fragment>
  );
};

export default Markup;
