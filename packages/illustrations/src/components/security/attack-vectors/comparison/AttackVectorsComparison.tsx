import { ContentTypes } from '@app/types';
import { Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import isArray from 'lodash/isArray';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

export const AttackVectorsComparison: FC = () => {
  const theme = useTheme();

  const { t } = useTranslation();

  const rows = t<Array<Array<ContentTypes.Content>>>(
    'pages/security/attack-vectors/comparison/index:steps',
    {},
    {
      returnObjects: true
    }
  ) || [[]];

  const result =
    isArray(rows) && rows.length > 0
      ? rows.map((row, rowIndex) => {
          return (
            <Grid container spacing={4} key={`row-${rowIndex}`}>
              {row.map((column, columnIndex) => {
                let intermediateResult = [];

                if (isArray(column.description)) {
                  intermediateResult = column.description.map(description => {
                    const { subTitle, text, listing, summary, note } =
                      description;

                    return (
                      <>
                        {subTitle &&
                          subTitle.length > 0 &&
                          subTitle.map(t => (
                            <Typography
                              variant='body1'
                              sx={{
                                fontWeight: theme.typography.fontWeightMedium
                              }}
                            >
                              {t}
                            </Typography>
                          ))}
                        {text &&
                          text.length > 0 &&
                          text.map(t => (
                            <Typography variant='body1'>{t}</Typography>
                          ))}
                        {listing && listing.length > 0 && (
                          <ul>
                            {listing.map(t => (
                              <li>
                                <Typography variant='body1'>{t}</Typography>
                              </li>
                            ))}
                          </ul>
                        )}
                        {summary &&
                          summary.length > 0 &&
                          summary.map(t => (
                            <Typography
                              variant='body1'
                              sx={{ fontStyle: 'italic' }}
                            >
                              {t}
                            </Typography>
                          ))}
                        {note && note.length > 0 && (
                          <blockquote>
                            {note.map(t => (
                              <Typography variant='body1'>{t}</Typography>
                            ))}
                          </blockquote>
                        )}
                      </>
                    );
                  });
                }
                return (
                  <Grid item xs={12} md={4} key={`column-${columnIndex}`}>
                    <>
                      {column.title ? (
                        <Typography
                          sx={{
                            fontWeight: theme.typography.fontWeightMedium,
                            textDecoration: 'underline'
                          }}
                        >
                          {column.title}
                        </Typography>
                      ) : null}
                      {column.subTitle ? (
                        <Typography
                          sx={{
                            fontWeight: theme.typography.fontWeightRegular
                          }}
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
