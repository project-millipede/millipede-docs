import { Statement } from '@app/components';
import { ContentTypes } from '@app/types';
import { I18n } from '@app/utils';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';

export const AttackVectorsComparison: FC = () => {
  const theme = useTheme();

  const { t } = I18n.useTranslation();

  const rows = t<Array<Array<ContentTypes.Content>>>(
    'pages/security/attack-vectors/comparison/index:steps',
    {},
    {
      returnObjects: true
    }
  ) || [[]];

  const result =
    Array.isArray(rows) && rows.length > 0
      ? rows.map((row, rowIndex) => {
          return (
            <Grid container spacing={4} key={`row-${rowIndex}`}>
              {row.map((column, columnIndex) => {
                let intermediateResult = [];

                if (Array.isArray(column.description)) {
                  intermediateResult = column.description.map(
                    (description, descriptionIndex) => {
                      const { subTitle, text, listing, summary, note } =
                        description;

                      return (
                        <Grid
                          container
                          spacing={4}
                          key={`row-${rowIndex}-description-${descriptionIndex}`}
                        >
                          {subTitle &&
                            subTitle.length > 0 &&
                            subTitle.map((subTitle, subTitleIndex) => (
                              <Typography
                                key={`row-${rowIndex}-description-${descriptionIndex}-subTitle-${subTitleIndex}`}
                                variant='body1'
                                sx={{
                                  fontWeight: theme.typography.fontWeightMedium
                                }}
                              >
                                {subTitle}
                              </Typography>
                            ))}
                          {text &&
                            text.length > 0 &&
                            text.map((text, textIndex) => (
                              <Typography
                                key={`row-${rowIndex}-description-${descriptionIndex}-text-${textIndex}`}
                                variant='body1'
                              >
                                {text}
                              </Typography>
                            ))}
                          {listing && listing.length > 0 && (
                            <ul>
                              {listing.map((listing, listingIndex) => (
                                <li
                                  key={`row-${rowIndex}-description-${descriptionIndex}-listing-${listingIndex}`}
                                >
                                  <Typography variant='body1'>
                                    {listing}
                                  </Typography>
                                </li>
                              ))}
                            </ul>
                          )}
                          {summary &&
                            summary.length > 0 &&
                            summary.map((summary, summaryIndex) => (
                              <Statement.Statement
                                key={`row-${rowIndex}-description-${descriptionIndex}-summary-${summaryIndex}`}
                                type={'summary'}
                                external
                              >
                                <Typography variant='body1'>
                                  {summary}
                                </Typography>
                              </Statement.Statement>
                            ))}
                          {note && note.length > 0 && (
                            <Statement.Statement
                              key={`row-${rowIndex}-description-${descriptionIndex}-note`}
                              type={'remark'}
                              external
                            >
                              {note.map((note, noteIndex) => (
                                <Typography
                                  variant='body1'
                                  key={`row-${rowIndex}-description-${descriptionIndex}-note-${noteIndex}`}
                                >
                                  {note}
                                </Typography>
                              ))}
                            </Statement.Statement>
                          )}
                        </Grid>
                      );
                    }
                  );
                }
                return (
                  <Grid xs={12} md={4} key={`column-${columnIndex}`}>
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
