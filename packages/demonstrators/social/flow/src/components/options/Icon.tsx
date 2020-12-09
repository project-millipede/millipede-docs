import { Message, PermMedia, RecentActors, SentimentSatisfiedAlt, TextFields } from '@material-ui/icons';
import React from 'react';

export const Icon = ({ id }) => {
  switch (id) {
    case 'header':
      return <RecentActors />;
    case 'media':
      return <PermMedia />;
    case 'content':
      return <TextFields />;
    case 'sentiment':
      return <SentimentSatisfiedAlt />;
    case 'comments':
      return <Message />;
    default:
      return null;
  }
};
