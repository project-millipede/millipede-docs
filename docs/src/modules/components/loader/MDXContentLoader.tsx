import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

import { Logger } from '../../utils/logging';
import { MdxDocs } from '../mdx';

const load = (pathSlice = '', userLanguage = ''): any =>
  import(`../../../pages${pathSlice}index${userLanguage}.mdx`)
    .then(result => {
      return {
        content: result.default,
        raw: result.raw,
        meta: result.meta,
        timeToRead: result.timeToRead
      };
    })
    .catch(error => {
      Logger.log(error);
    });

export interface MDXContentLoaderProps {
  path: string;
  disableToc?: boolean;
  disableShare?: boolean;
}

const MDXContentLoader: FC<MDXContentLoaderProps> = ({
  path,
  disableToc = false,
  disableShare = false
}) => {
  const [contentMain, setContentMain] = useState('');
  const [metaMain, setMetaMain] = useState('');
  const [rawMain, setRawMain] = useState('');
  const [timeToReadMain, setTimeToReadMain] = useState();

  const { locale } = useRouter();

  useEffect(() => {
    const loadContent = async () => {
      let content: any;
      if (locale === 'de') {
        content = await load(path, '-de');
      } else {
        content = await load(path);
      }
      setContentMain(content?.content);
      setRawMain(content?.raw);
      setMetaMain(content?.meta);
      setTimeToReadMain(content?.timeToRead);
    };
    loadContent();
  }, [locale]);

  return (
    <MdxDocs
      content={contentMain}
      raw={rawMain}
      meta={metaMain}
      timeToRead={timeToReadMain}
      disableToc={disableToc}
      disableShare={disableShare}
    />
  );
};

export default MDXContentLoader;

/**
 * import React from 'react';
 * import { MdxDocs } from '../../../../docs/src/modules/components/mdx';
 * import content, { ast, headingsMap, meta, raw } from '../../../../docs/src/pages/pidp/approach/byExample/index.mdx';
 * const Page = () => {
 *   return <MdxDocs content={content} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
 * };
 * export default Page;
 */
