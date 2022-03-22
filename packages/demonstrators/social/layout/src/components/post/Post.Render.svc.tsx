import { EffectRef } from '@huse/effect-ref';
import { Avatar, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import get from 'lodash/get';

export const getHeader = (
  ref: EffectRef<HTMLElement>,
  firstName: string,
  lastName: string,
  avatar: string,
  date: string
) => {
  return (
    <CardHeader
      ref={ref}
      avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
      title={`${firstName} ${lastName}`}
      subheader={date}
    />
  );
};

export const getMedia = (
  ref: EffectRef<HTMLElement>,
  imageHref: string,
  imageTitle: string
) => {
  return (
    <CardMedia
      ref={ref}
      image={imageHref}
      title={imageTitle}
      sx={{
        height: 0,
        paddingTop: '56.25%' // perfect 16:9 ratio
      }}
    />
  );
};

export const getContent = (ref: EffectRef<HTMLElement>, text: string) => {
  return (
    <CardContent ref={ref}>
      <Typography variant='body2' color='textSecondary' component='p'>
        {text}
      </Typography>
    </CardContent>
  );
};

export const getRef =
  (refs: { [key: string]: EffectRef<HTMLElement> }) => (id: string) => {
    return get(refs, id);
  };
