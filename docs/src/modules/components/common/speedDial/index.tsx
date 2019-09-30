import React, { useState } from 'react';

import Markup, { MarkupProps } from './Markup';

interface SpeedDialProps {
  id?: string;
  share: string;
}

const SpeedDial = ({ id, share }: SpeedDialProps) => {
  const [sharingOpen, setSharingOpen] = useState(false);
  const [modal, setModal] = useState();

  const toggleModal = (value = null) => {
    return setModal(value);
  };

  const toggleSharingOpen = () => {
    setSharingOpen(!sharingOpen);
  };

  const passedProps: MarkupProps = {
    sharingOpen,
    modal,
    toggleSharingOpen,
    toggleModal,
    id,
    share
  };

  return <Markup {...passedProps} />;
};

export default SpeedDial;
