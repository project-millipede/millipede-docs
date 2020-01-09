import React, { useState } from 'react';

import Markup, { MarkupProps } from './Markup';

interface ShareProps {
  id?: string;
  share: string;
}

const Share = ({ id, share }: ShareProps) => {
  const [sharingOpen, setSharingOpen] = useState(false);
  const [modal, setModal] = useState();

  const toggleModal = (value = null) => {
    setModal(value);
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

export default Share;
