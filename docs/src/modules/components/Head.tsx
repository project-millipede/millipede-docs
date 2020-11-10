import useTranslation from 'next-translate/useTranslation';
import NextHead from 'next/head';
import React, { FC } from 'react';

import { MetaProps } from '../../../../src/typings/share';

interface HeadProps {
  meta?: MetaProps;
}

const defaultTitle = 'headTitle';
const defaultDescription = 'strapline';

const Head: FC<HeadProps> = ({ meta = {} }) => {
  const {
    title = defaultTitle,
    description = defaultDescription,
    keywords,
    author,
    date
  } = meta;

  const { t } = useTranslation();

  return (
    <NextHead>
      <title>{title === defaultTitle ? t(`common:${title}`) : title}</title>
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
    </NextHead>
  );
};

export default Head;
