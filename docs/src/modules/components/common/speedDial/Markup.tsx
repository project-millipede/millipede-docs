import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useRouter } from 'next/router';
import React from 'react';

import { Interaction, InteractionMenuItem } from '../../../../../../src/typings/share/social';
import { objectToGetParams } from '../../../utils/social/objectToGetParams';
import Icon from './Icon';
import Modal from './Modal';

const isBrowser = typeof window !== 'undefined';

export interface MarkupProps {
  sharingOpen: boolean;
  modal: string;
  toggleSharingOpen: () => void;
  toggleModal: (value: any) => void;
  id: string;
  share: string;
}

const sharing: Array<InteractionMenuItem> = [
  {
    type: Interaction.SHARE_LOCAL,
    title: 'Copy link',
    url: ''
  },
  {
    type: Interaction.SHARE,
    title: 'Share on Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php'
  },
  {
    type: Interaction.SHARE,

    title: 'Share on Twitter',
    url: 'https://twitter.com/home?status'
  },
  {
    type: Interaction.SHARE,

    title: 'Share on Linkedin',
    url: 'https://www.linkedin.com/shareArticle?mini=true&url='
  }
];

const createNewTab = newUrl => {
  const { focus } = window.open(newUrl, '_blank');
  return focus();
};

const createObjects = (
  baseUrl: string,
  toggleModal: (baseURL: string) => void,
  toggleSharingOpen: () => void
) => ({ type, title, url }: InteractionMenuItem) => {
  if (type === Interaction.SHARE_LOCAL) {
    return {
      title,
      icon: <Icon {...{ title }} />,
      action: () => {
        toggleSharingOpen();
        toggleModal(baseUrl);
      }
    };
  }

  return {
    title,
    icon: <Icon {...{ title }} />,
    action: () => {
      toggleSharingOpen();
      createNewTab(
        `${url}${objectToGetParams({
          u: baseUrl,
          quote: 'quote',
          hashtag: '#hashtag'
        })}`
      );
    }
  };
};

const creataShareLink = ({ title, icon, action }) => (
  <SpeedDialAction
    key={title}
    icon={icon}
    tooltipTitle={title}
    onClick={action}
    tooltipPlacement={'bottom'}
  />
);

const createButtons = (toggleModal, toggleSharingOpen, share) => {
  if (isBrowser) {
    const url = document.URL.replace(/#.*$/, '');
    const baseUrl = typeof share === 'string' ? `${url}/#${share}` : url;
    // const baseUrl = 'http://millipede.me';
    const buttonsInfo = sharing.map(createObjects(baseUrl, toggleModal, toggleSharingOpen));
    return buttonsInfo.map(creataShareLink);
  }
};

const Markup = ({ sharingOpen, toggleSharingOpen, toggleModal, modal }: MarkupProps) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <SpeedDial
        ariaLabel='SpeedDial openIcon example'
        icon={!!sharingOpen ? <CloseIcon /> : <ShareIcon />}
        onClick={toggleSharingOpen}
        open={!!sharingOpen}
        direction='left'
      >
        {/* {createButtons(toggleModal, toggleSharingOpen, share)} */}
        {createButtons(toggleModal, toggleSharingOpen, router.pathname)}
      </SpeedDial>
      <Modal open={!!modal} closeModal={() => toggleModal(null)} url={modal} />
    </React.Fragment>
  );
};

export default Markup;
