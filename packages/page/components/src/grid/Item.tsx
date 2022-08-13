import { CustomIcon, HiddenUnderlineLink, Statement } from '@app/components';
import { ContentTypes } from '@app/types';
import { IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';

export const TextGroup = styled(Grid)(() => ({
  '& ol': {
    paddingLeft: 0,
    listStyle: 'circle'
  }
}));

export const GridWrapper = styled('div')(({ theme }) => {
  return {
    display: 'grid',
    gridTemplateColumns: `min-content 1fr`,
    gridTemplateAreas: `
      'head_icon head_text'
      '. content_text'
      `,
    gridTemplateRows: `auto 1fr`,
    rowGap: theme.spacing(2),
    columnGap: theme.spacing(2)
  };
});

export const Item: FC<Partial<ContentTypes.OverviewProps>> = ({
  title,
  description,
  link,
  icon
}) => {
  let intermediateResult = [];

  if (Array.isArray(description)) {
    intermediateResult = description.map((descriptionItem, index) => {
      const {
        subTitle = [],
        listing = [],
        summary = [],
        note = []
      } = descriptionItem;

      return (
        <TextGroup key={`description-${index}`}>
          {subTitle.map((subTitleItem, index) => (
            // <Typography key={`subTitle-${index}`} variant='subtitle1'>
            //   {subTitleItem}
            // </Typography>

            <Statement.Statement
              key={`subTitle-${index}`}
              type={'question'}
              external
            >
              {subTitleItem}
            </Statement.Statement>
          ))}
          {listing.length > 0 ? (
            <ol key={`listing-${index}`}>
              {listing.map((listingItem, index) => {
                return listingItem.link ? (
                  <li key={`listing-element-${index}`}>
                    <Typography
                      component={HiddenUnderlineLink}
                      sx={{
                        color: 'inherit',
                        '&:hover': {
                          color: grey[600]
                        }
                      }}
                      href={{
                        pathname: '/docs/[...slug]',
                        query: { slug: listingItem.link.split('/') }
                      }}
                      prefetch={false}
                    >
                      {listingItem.text}
                    </Typography>
                  </li>
                ) : (
                  <li key={`listing-element-${index}`}>
                    <Typography>{listingItem.text}</Typography>
                  </li>
                );
              })}
            </ol>
          ) : null}
          {summary.map((summaryItem, index) => (
            // <Typography key={`summary-${index}`}>{summaryItem}</Typography>
            <Statement.Statement
              key={`summary-${index}`}
              type={'summary'}
              external
            >
              {summaryItem}
            </Statement.Statement>
          ))}
          {/* {note.map((noteItem, index) => (
            <TextGroup key={`note-${index}`}>{noteItem}</TextGroup>
          ))} */}
          {Array.isArray(note) &&
            note.map((noteItem, index) => (
              <Statement.Statement
                key={`note-${index}`}
                type={'remark'}
                external
              >
                {noteItem}
              </Statement.Statement>
            ))}
        </TextGroup>
      );
    });
  }

  return (
    <GridWrapper>
      {link ? (
        <IconButton
          component={HiddenUnderlineLink}
          key={`link-${link}`}
          sx={{
            gridArea: 'head_icon',
            padding: '10px',
            width: 40,
            height: 40
          }}
          href={{
            pathname: '/docs/[...slug]',
            query: { slug: link.split('/') }
          }}
          prefetch={false}
        >
          <CustomIcon icon={icon} />
        </IconButton>
      ) : null}
      <Typography variant='h4' style={{ gridArea: 'head_text' }}>
        {title}
      </Typography>

      <div style={{ gridArea: 'content_text' }}>
        {/* {isArray(description) ? (
          intermediateResult
        ) : (
          <Typography variant='h3'>{description}</Typography>
        )} */}
        {Array.isArray(description) && intermediateResult}
      </div>
    </GridWrapper>
  );
};
