import NextHead from 'next/head';
import React, { FC } from 'react';

import { useTranslation } from '../../../../i18n';
import { MetaProps } from '../../../../src/typings/share';

interface Props {
  meta?: MetaProps;
}

const Head: FC<Props> = ({
  meta: {
    title = 'headTitle',
    description = 'strapline',
    keywords,
    author,
    date
  }
}) => {
  const { t } = useTranslation();

  return (
    <NextHead>
      <title>{title.indexOf('headTitle') ? t(title) : title}</title>
      <meta
        name='description'
        content={
          description.indexOf('strapline') ? t(description) : description
        }
      />
      {keywords ? <meta name='keywords' content={keywords} /> : null}
      {author ? <meta name='author' content={author} /> : null}
      {date ? <meta name='date' content={date} /> : null}
    </NextHead>
  );
};

Head.defaultProps = {
  meta: {}
};

export default Head;
