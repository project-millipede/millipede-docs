import { AlternateEmail, Assignment, Facebook, LinkedIn, Twitter, WhatsApp } from '@material-ui/icons';
import React from 'react';

export const Icon = ({ id }) => {
  switch (id) {
    case 'copy-link':
      return <Assignment />;
    case 'mail':
      return <AlternateEmail />;
    case 'facebook':
      return <Facebook />;
    case 'twitter':
      return <Twitter />;
    case 'linkedin':
      return <LinkedIn />;
    case 'whatsapp':
      return <WhatsApp />;
    default:
      return null;
  }
};
