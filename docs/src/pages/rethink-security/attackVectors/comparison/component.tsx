import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React from 'react';

import { Stack } from '../../../../../../src/typings/data/import';

export const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      // padding: theme.spacing(2),
      textAlign: 'center'
      // color: theme.palette.text.secondary
    },
    typographyDisabled: {
      // color: theme.palette.text.disabled
    },
    typographyEnabled: {
      // color: theme.palette.text.primary
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    title: {
      fontWeight: 'bold',
      textDecoration: 'underline'
    },
    subTitle: {
      fontWeight: 'bold'
    },
    summary: {
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  })
);

const ByExample = ({ rows = [[]] }: Stack) => {
  const classes = useStyles();

  const result = rows.map(row => {
    return (
      <Grid container spacing={8}>
        {row.map((column, _index) => {
          let intermediateResult = [];

          if (_.isArray(column.description)) {
            intermediateResult = column.description.map(description => {
              return (
                <>
                  {description.subTitle && description.subTitle.length > 0
                    ? description.subTitle.map(t => (
                        <Typography
                          variant='subtitle1'
                          className={classes.subTitle}
                        >
                          {t}
                        </Typography>
                      ))
                    : null}
                  {description.text && description.text.length > 0
                    ? description.text.map(t => (
                        <Typography variant='subtitle1'>{t}</Typography>
                      ))
                    : null}
                  {description.listing && description.listing.length > 0 ? (
                    <ul>
                      {description.listing.map(t => (
                        <li>
                          <Typography variant='subtitle1'>{t}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {description.summary && description.summary.length > 0
                    ? description.summary.map(t => (
                        <Typography
                          variant='subtitle1'
                          className={classes.summary}
                        >
                          {t}
                        </Typography>
                      ))
                    : null}
                  {description.note && description.note.length > 0 ? (
                    <blockquote>
                      {description.note.map(t => (
                        <Typography
                          variant='subtitle1'
                          className={classes.summary}
                        >
                          {t}
                        </Typography>
                      ))}
                    </blockquote>
                  ) : null}
                </>
              );
            });
          }
          return (
            <Grid item xs={12} md={4}>
              <>
                {column.title ? (
                  <Typography variant='subtitle1' className={classes.title}>
                    {column.title}
                  </Typography>
                ) : null}
                {column.subTitle ? (
                  <Typography variant='subtitle1' className={classes.subTitle}>
                    {column.subTitle}
                  </Typography>
                ) : null}
                {intermediateResult}
              </>
            </Grid>
          );
        })}
      </Grid>
    );
  });
  return <>{result}</>;
};

export default ByExample;
