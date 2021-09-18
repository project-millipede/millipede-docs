import { CustomIcon, Link } from '@app/components';
import { ContentTypes } from '@app/types';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import isArray from 'lodash/isArray';
import { useRouter } from 'next/router';
import React from 'react';

// const useStyles = makeStyles((theme: Theme) => ({
//   ==> unresolved
//   note: {
//     fontWeight: theme.typography.fontWeightMedium,
//     fontStyle: 'italic',
//     '& blockquote': {
//       borderLeft: '5px solid #ffe564',
//       backgroundColor: 'rgba(255,229,100,0.2)',
//       padding: '4px 24px',
//       margin: '24px 0',
//       '& p': {
//         marginTop: '16px'
//       }
//     }
//   }
// }));

// TODO: Simplify
export const NoteDiv = styled('div')(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontStyle: 'italic',
  '& blockquote': {
    borderLeft: '5px solid #ffe564',
    backgroundColor: 'rgba(255,229,100,0.2)',
    padding: '4px 24px',
    margin: '24px 0',
    '& p': {
      marginTop: '16px'
    }
  }
}));

// TODO: Simplify
export const Note = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontStyle: 'italic',
  '& blockquote': {
    borderLeft: '5px solid #ffe564',
    backgroundColor: 'rgba(255,229,100,0.2)',
    padding: '4px 24px',
    margin: '24px 0',
    '& p': {
      marginTop: '16px'
    }
  }
}));

export const Item = ({
  title,
  description,
  link,
  icon
}: ContentTypes.OverviewProps) => {
  const theme = useTheme();

  const { push } = useRouter();

  const handleSelect = (link: string) => {
    push({
      pathname: '/docs/[...slug]',
      query: { slug: link.split('/') }
    });
  };

  let intermediateResult = [];

  if (isArray(description)) {
    intermediateResult = description.map((d, index) => {
      const {
        subTitle = [],
        text = [],
        listing = [],
        summary = [],
        note = []
      } = d;

      return (
        <NoteDiv key={`description-${index}`}>
          {subTitle.map((t, index) => (
            <Typography
              key={`subTitle-${index}`}
              variant='subtitle1'
              sx={{
                fontWeight: theme.typography.fontWeightRegular
              }}
            >
              {t}
            </Typography>
          ))}
          {text.map((t, index) => (
            <Typography key={`text-${index}`} variant='subtitle1'>
              {t}
            </Typography>
          ))}
          {listing.length > 0 ? (
            <ol key={`listing-${index}`}>
              {listing.map((item, index) => {
                return item.link ? (
                  <li key={`listing-element-${index}`}>
                    <Typography
                      variant='h6'
                      component={Link}
                      href={{
                        pathname: '/docs/[...slug]',
                        query: { slug: item.link.split('/') }
                      }}
                    >
                      {item.text}
                    </Typography>
                  </li>
                ) : (
                  <li key={`listing-element-${index}`}>
                    <Typography variant='h6'>{item.text}</Typography>
                  </li>
                );
              })}
            </ol>
          ) : null}
          {summary.map((t, index) => (
            <Typography
              key={`summary-${index}`}
              variant='subtitle1'
              sx={{
                fontWeight: theme.typography.fontWeightMedium,
                fontStyle: 'italic'
              }}
            >
              {t}
            </Typography>
          ))}
          {note.length > 0 ? (
            <>
              {note.map((item, index) => (
                <Note key={`note-${index}`} variant='subtitle1'>
                  {item}
                </Note>
              ))}
            </>
          ) : null}
        </NoteDiv>
      );
    });
  }

  return (
    <div style={{ display: 'flex' }}>
      {link ? (
        <Avatar sx={{ margin: theme.spacing(0, 1) }}>
          <IconButton
            key={`link-${link}`}
            onClick={_e => {
              handleSelect(link);
            }}
          >
            <CustomIcon icon={icon} />
          </IconButton>
        </Avatar>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5'>{title}</Typography>
        {isArray(description) ? (
          intermediateResult
        ) : (
          <Typography variant='h5'>{description}</Typography>
        )}
      </div>
    </div>
  );
};
