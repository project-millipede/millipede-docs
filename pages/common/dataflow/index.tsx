import { useHoux } from 'houx';
import React, { useEffect, useState } from 'react';

import { MdxDocs } from '../../../docs/src/modules/components/mdx';
import { RootState } from '../../../docs/src/modules/redux/reducers';

const load = (userLanguage = ''): any =>
  import(`../../../docs/src/pages/common/dataflow/index${userLanguage}.mdx`)
    .then(result => {
      return {
        content: result.default,
        raw: result.raw
      };
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log(error);
    });

const Page = () => {
  const [contentMain, setContentMain] = useState('');
  const [rawMain, setRawMain] = useState('');
  const { state }: { state: RootState } = useHoux();
  useEffect(() => {
    const loadContent = async () => {
      let content: any;
      if (state.language.userLanguage === 'de') {
        content = await load('-de');
      } else {
        content = await load();
      }
      setContentMain(content.content);
      setRawMain(content.raw);
    };
    loadContent();
  }, [state.language.userLanguage]);

  return <MdxDocs content={contentMain} raw={rawMain} />;
};

export default Page;

/**
 * import React from 'react';
 * import { MdxDocs } from '../../../../docs/src/modules/components/mdx';
 * import content, { ast, headingsMap, meta, raw } from '../../../../docs/src/pages/common/dataflow/comparison/index.mdx';
 * const Page = () => {
 *   return <MdxDocs content={content} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
 * };
 * export default Page;
 */
