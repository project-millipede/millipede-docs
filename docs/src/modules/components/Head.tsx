import NextHead from 'next/head';
import React, { FC } from 'react';

import { useTranslation } from '../../../../i18n';
import { MetaProps } from '../../../../src/typings/share';

interface Props {
  meta?: MetaProps;
}

const defaultTitle = 'headTitle';
const defaultDescription = 'strapline';

const Head: FC<Props> = ({ meta = {} }) => {
  const {
    title = defaultTitle,
    description = defaultDescription,
    keywords,
    author,
    date
  } = meta;

  const { t } = useTranslation([]);

  return (
    <NextHead>
      <title>{title === defaultTitle ? t(title) : title}</title>
      <meta
        name='description'
        content={
          description === defaultDescription ? t(description) : description
        }
      />
      {keywords ? <meta name='keywords' content={keywords} /> : null}
      {author ? <meta name='author' content={author} /> : null}
      {date ? <meta name='date' content={date} /> : null}
    </NextHead>
  );
};

export default Head;
