import { ContentTypes } from '@app/types';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import isArray from 'lodash/isArray';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

export const useStyles = makeStyles(() =>
  createStyles({
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

//rows: ContentTypes.Stack

export const AttackVectorsComparison: FC = () => {
  const { t } = useTranslation();

  const rows = t<Array<Array<ContentTypes.Content>>>(
    'pages/security/attack-vectors/comparison/index:steps',
    {},
    {
      returnObjects: true
    }
  ) || [[]];

  const classes = useStyles();

  const result =
    isArray(rows) && rows.length > 0
      ? rows.map((row, rowIndex) => {
          return (
            <Grid container spacing={8} key={`row-${rowIndex}`}>
              {row.map((column, columnIndex) => {
                let intermediateResult = [];

                if (isArray(column.description)) {
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
                        {description.listing &&
                        description.listing.length > 0 ? (
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
                  <Grid item xs={12} md={4} key={`column-${columnIndex}`}>
                    <>
                      {column.title ? (
                        <Typography
                          variant='subtitle1'
                          className={classes.title}
                        >
                          {column.title}
                        </Typography>
                      ) : null}
                      {column.subTitle ? (
                        <Typography
                          variant='subtitle1'
                          className={classes.subTitle}
                        >
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
        })
      : null;
  return <>{result}</>;
};
