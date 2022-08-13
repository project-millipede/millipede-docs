import { PageTypes } from '@app/types';
import { Blurb } from '@blog/components';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { FC, useMemo } from 'react';

interface BlogHeaderProps {
  metaData: PageTypes.MetaData;
}

const github = 'gurkerl83';

export const BlogHeader: FC<BlogHeaderProps> = ({ metaData }) => {
  const { editedAt, author, title, blurb } = metaData;

  const editDate = useMemo(() => {
    return format(new Date(editedAt), 'MMMM do, yyyy');
  }, [editedAt]);

  const theme = useTheme();

  return (
    <>
      <Typography variant='h1'>{title}</Typography>
      <Blurb variant='h3'>{blurb}</Blurb>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: theme.spacing(5, 0)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ marginRight: theme.spacing(2) }}
            src={`https://github.com/${github}.png`}
          />
          <Typography variant='body2' gutterBottom={false}>
            {author}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          gutterBottom={false}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Last updated {editDate}
        </Typography>
      </Box>
    </>
  );
};
