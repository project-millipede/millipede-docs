import { PageTypes } from '@app/types';
import useTranslation from 'next-translate/useTranslation';
import NextHead from 'next/head';
import React, { FC } from 'react';

interface HeadProps {
  metaData?: PageTypes.ContentMetaData;
}

const defaultTitle = 'headTitle';
const defaultDescription = 'strapline';
export const AppHead: FC<HeadProps> = ({ metaData = {} }) => {
  const {
    title = defaultTitle,
    description = defaultDescription,
    keywords,
    author,
    date
  } = metaData;

  const { t } = useTranslation();

  return (
    <NextHead>
      <meta name='viewport' content='initial-scale=1, width=device-width' />
      <meta
        name='description'
        content={
          description === defaultDescription
            ? t(`common:${description}`)
            : description
        }
      />
      {keywords ? <meta name='keywords' content={keywords} /> : null}
      {author ? <meta name='author' content={author} /> : null}
      {date ? <meta name='date' content={date} /> : null}

      <title>{title === defaultTitle ? t(`common:${title}`) : title}</title>
    </NextHead>
  );
};
