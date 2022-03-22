import { AlternateEmail, Assignment, Facebook, LinkedIn, Twitter, WhatsApp } from '@mui/icons-material';
import { FC } from 'react';

interface IconProps {
  id: string;
}

export const Icon: FC<IconProps> = ({ id }) => {
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
