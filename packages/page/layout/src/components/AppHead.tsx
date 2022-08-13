import { PageTypes } from '@app/types';
import { I18n } from '@app/utils';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface HeadProps {
  metaData: PageTypes.MetaData;
}

const HOST = 'https://millipede.me';

const defaultTitle = 'headTitle';
const defaultDescription = 'strapline';
const defautlAuthor = 'Markus Gritsch';

export const AppHead: FC<HeadProps> = ({ metaData }) => {
  const {
    title = defaultTitle,
    description = defaultDescription,
    keywords,
    author = defautlAuthor,
    date,
    editedAt
  } = metaData;

  const largeCard = true;

  const { t } = I18n.useTranslation();

  /**
   * Note:
   * Either use next-router or on the client window.location.href, where window is defined.
   */
  const { asPath } = useRouter();

  // const url = RenderUtils.isBrowser() && window.location.href;

  return (
    <NextHead>
      <title>{title === defaultTitle ? t(`common:${title}`) : title}</title>
      <meta name='viewport' content='initial-scale=1, width=device-width' />
      <meta
        name='description'
        content={
          description === defaultDescription
            ? t(`common:${description}`)
            : description
        }
      />
      {author && <meta name='author' content={author} />}
      {date && <meta name='date' content={date} />}
      {editedAt && <meta name='date' content={editedAt} />}
      {keywords && <meta name='keywords' content={keywords} />}
      {/* Twitter */}
      <meta
        name='twitter:card'
        content={largeCard ? 'summary_large_image' : 'summary'}
      />
      <meta name='twitter:site' content='@gurkerl83' />
      <meta name='twitter:creator' content='@gurkerl83' />
      <meta
        name='twitter:title'
        content={title === defaultTitle ? t(`common:${title}`) : title}
      />
      <meta
        name='twitter:description'
        content={
          description === defaultDescription
            ? t(`common:${description}`)
            : description
        }
      />
      {/* <meta name='twitter:image' content={'todo.png'} /> */}
      {/* Facebook */}
      <meta property='og:type' content='website' />
      <meta
        property='og:title'
        content={title === defaultTitle ? t(`common:${title}`) : title}
      />
      <meta
        property='og:description'
        content={
          description === defaultDescription
            ? t(`common:${description}`)
            : description
        }
      />
      {/* <meta property='og:image' content={'todo.png'} /> */}
      <meta property='og:url' content={`${HOST}${asPath}`} />
      <meta property='og:ttl' content='604800' />
    </NextHead>
  );
};
