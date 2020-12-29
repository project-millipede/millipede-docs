import { EffectRef } from '@huse/effect-ref';
import { Avatar, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import get from 'lodash/get';
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

export const getRef = (refs: { [key: string]: EffectRef<HTMLElement> }) => (
  id: string
) => {
  return get(refs, id);
};

export const getObserverComp = (ref: EffectRef<HTMLElement>) => (
  children: JSX.Element
) => {
  if (ref != null) {
    return <div ref={ref}>{children}</div>;
  }
  return <>{children}</>;
};
