import { getIconByName, Link } from '@app/components';
import { ContentTypes } from '@app/types';
import { Avatar, createStyles, IconButton, makeStyles, Typography } from '@material-ui/core';
import isArray from 'lodash/isArray';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      display: 'flex'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    avatar: {
      margin: 12
    },
    title: {
      fontWeight: 'bold'
    },
    subTitle: {
      fontWeight: 'bold'
    },
    summary: {
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
    note: {
      fontWeight: 'bold',
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
    }
  })
);

export const Item = ({
  title,
  description,
  link,
  icon
}: ContentTypes.OverviewProps) => {
  const classes = useStyles();

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
        <div key={`description-${index}`} className={classes.note}>
          {subTitle.map((t, index) => (
            <Typography
              key={`subTitle-${index}`}
              variant='subtitle1'
              className={classes.subTitle}
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
                    <Link
                      href={
                        {
                          pathname: '/docs/[...slug]',
                          query: { slug: item.link.split('/') }
                          // hash: (item as any).hash
                        } as any
                      }
                    >
                      <Typography variant='h6'>{item.text}</Typography>
                    </Link>
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
              className={classes.summary}
            >
              {t}
            </Typography>
          ))}
          {note.length > 0 ? (
            <>
              {note.map((item, index) => (
                <Typography
                  key={`note-${index}`}
                  variant='subtitle1'
                  className={classes.note}
                >
                  {item}
                </Typography>
              ))}
            </>
          ) : null}
        </div>
      );
    });
  }

  return (
    <div className={classes.row}>
      {link ? (
        <Avatar className={classes.avatar}>
          <IconButton
            key={`link-${link}`}
            onClick={_e => {
              handleSelect(link);
            }}
          >
            {getIconByName(icon.name)}
          </IconButton>
        </Avatar>
      ) : null}
      <div className={classes.column}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        {isArray(description) ? (
          intermediateResult
        ) : (
          <Typography variant='h6'>{description}</Typography>
        )}
      </div>
    </div>
  );
};
