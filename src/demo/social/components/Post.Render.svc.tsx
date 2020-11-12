import { EffectRef } from '@huse/effect-ref';
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@material-ui/core';
import React from 'react';

export const getHeader = (
  firstName: string,
  lastName: string,
  avatar: string,
  date: string
) => {
  return (
    <CardHeader
      avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
      title={`${firstName} ${lastName}`}
      subheader={date}
    />
  );
};

export const getMedia = (
  imageHref: string,
  imageTitle: string,
  media: string
) => {
  return <CardMedia className={media} image={imageHref} title={imageTitle} />;
};

export const getContent = (text: string) => {
  return (
    <CardContent>
      <Typography variant='body2' color='textSecondary' component='p'>
        {text}
      </Typography>
    </CardContent>
  );
};

export const getObserverComp = (
  selected: boolean,
  ref: EffectRef<HTMLElement>
) => (children: JSX.Element) => {
  if (selected && ref != null) {
    return null;
  }
  return <div>{children}</div>;
};
