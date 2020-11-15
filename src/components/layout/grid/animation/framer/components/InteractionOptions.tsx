import { createStyles, Fade, makeStyles, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, SyntheticEvent, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import {
  InteractionOption,
  interactionOptionsState,
} from '../../../../../../../docs/src/modules/recoil/features/scroll/interaction/reducer';
import { Interaction, InteractionMenuItem, MetaProps } from '../../../../../../typings/share';
import Icon from './Icon';

export interface ShareProps {
  meta: MetaProps;
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

const getInteraction = (_t: Translate) => {
  return [
    {
      id: 'header',
      type: Interaction.SHARE_LOCAL,
      title: 'Header'
    },
    {
      id: 'media',
      type: Interaction.SHARE_LOCAL,
      title: 'media'
    },
    {
      id: 'content',
      type: Interaction.SHARE_LOCAL,
      title: 'content'
    },
    {
      id: 'sentiment',
      type: Interaction.SHARE_LOCAL,
      title: 'sentiment'
    },
    {
      id: 'comments',
      type: Interaction.SHARE_LOCAL,
      title: 'comments'
    }
  ];
};

const createObjects = (
  hideSpeedDial: (type: Interaction) => void,
  interactionOption: InteractionOption,
  setInteractionOption: SetterOrUpdater<InteractionOption>
) => ({ id, type, title }: InteractionMenuItem) => {
  return {
    title,
    icon: <Icon id={id} />,
    action: () => {
      const { activeIds } = interactionOption;
      const selectedInteractionOption = activeIds[id];
      setInteractionOption({
        ...interactionOption,
        activeIds: {
          ...interactionOption.activeIds,
          [id]: !selectedInteractionOption
        }
      });
      hideSpeedDial(type);
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
  t: Translate,
  interactionOption: InteractionOption,
  setInteractionOption: SetterOrUpdater<InteractionOption>
) => {
  const buttonsInfo = getInteraction(t).map(
    createObjects(hideSpeedDial, interactionOption, setInteractionOption)
  );

  return buttonsInfo.map(creataShareLink);
};

export const InteractionOptions: FC<MetaProps> = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const [feedback, setFeedback] = useState({
    open: false,
    message: ''
  });

  const [interactionOption, setInteractionOption] = useRecoilState(
    interactionOptionsState
  );

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

  return (
    <>
      <SpeedDial
        ariaLabel={'select-interaction'}
        icon={<SpeedDialIcon icon={<ShareIcon />} openIcon={<CloseIcon />} />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
        direction='down'
        className={classes.speedDial}
      >
        {createButtons(
          handleSpeedDialCloseWithFeedback,
          t,
          interactionOption,
          setInteractionOption
        )}
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
