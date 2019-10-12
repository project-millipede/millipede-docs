import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Assignment from '@material-ui/icons/Assignment';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import React from 'react';

const Icon = ({ id }) => {
  switch (id) {
    case 'copy-link':
      return <Assignment />;
    case 'mail':
      return <AlternateEmailIcon />;
    case 'facebook':
      return <FacebookIcon />;
    case 'twitter':
      return <TwitterIcon />;
    case 'linkedin':
      return <LinkedInIcon />;
    case 'whatsapp':
      return <WhatsAppIcon />;
    default:
      return null;
  }
};

export default Icon;
