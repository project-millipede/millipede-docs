import { Avatar, createStyles, Icon, makeStyles, Theme, Typography } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';

import { OverviewProps } from '../../../../../../src/typings/data/import';
import Link from '../link/Link';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    avatar: {
      margin: 12
    },
    title: {
      textAlign: 'left',
      fontWeight: 'bold'
    },
    subTitle: {
      fontWeight: 'bold'
    },
    description: {
      textAlign: 'left'
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

export const Item = ({ title, description, link, icon }: OverviewProps) => {
  const classes = useStyles({});

  let intermediateResult = [];

  if (_.isArray(description)) {
    intermediateResult = description.map(description => {
      const {
        subTitle = [],
        text = [],
        listing = [],
        summary = [],
        note = []
      } = description;

      return (
        <div className={classes.note}>
          {subTitle.map(t => (
            <Typography variant='subtitle1' className={classes.subTitle}>
              {t}
            </Typography>
          ))}
          {text.map(t => (
            <Typography variant='subtitle1'>{t}</Typography>
          ))}
          {listing.length > 0 ? (
            <ol>
              {listing.map(item => {
                return item.link ? (
                  <li>
                    <Link href={item.link} variant='h6' color='inherit'>
                      <Typography variant='h6'>{item.text}</Typography>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Typography variant='h6'>{item.text}</Typography>
                  </li>
                );
              })}
            </ol>
          ) : null}
          {summary.map(t => (
            <Typography variant='subtitle1' className={classes.summary}>
              {t}
            </Typography>
          ))}
          {note.length > 0 ? (
            <blockquote>
              {note.map(item => (
                <Typography variant='subtitle1' className={classes.note}>
                  {item}
                </Typography>
              ))}
            </blockquote>
          ) : null}
        </div>
      );
    });
  }

  return (
    <div className={classes.row}>
      {link ? (
        <Link href={link}>
          <Avatar className={classes.avatar}>
            <Icon>{icon}</Icon>
          </Avatar>
        </Link>
      ) : null}
      <div className={classes.column}>
        <Typography variant='h5' component='h5' className={classes.title}>
          {title}
        </Typography>
        {_.isArray(description) ? (
          intermediateResult
        ) : (
          <Typography
            variant='h6'
            component='h6'
            className={classes.description}
          >
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Item;
