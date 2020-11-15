import MessageIcon from '@material-ui/icons/Message';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import React from 'react';

const Icon = ({ id }) => {
  switch (id) {
    case 'header':
      return <RecentActorsIcon />;
    case 'media':
      return <PermMediaIcon />;
    case 'content':
      return <TextFieldsIcon />;
    case 'sentiment':
      return <SentimentSatisfiedAltIcon />;
    case 'comments':
      return <MessageIcon />;
    default:
      return null;
  }
};

export default Icon;
