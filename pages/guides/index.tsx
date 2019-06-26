import { RootState } from 'docs/src/modules/redux/reducers';
import { useHoux } from 'houx';
import React, { useEffect, useState } from 'react';

import { MdDocs } from '../../docs/src/modules/components/md';

// Taking a more functional approach :)
const load = (userLanguage: string = ''): any =>
  import(`../../docs/src/pages/guides/api/api${userLanguage}.md`)
    .then(result => {
      return result.default;
    })
    .catch(error => console.log(error));

const loadInEnglish = load('');
const loadInGerman = load('-de');

const Page = () => {
  const [contentMain, setContentMain] = useState('');
  const { state }: { state: RootState } = useHoux();
  useEffect(() => {
    const loadContent = async () => {
      let content: any;
      if (state.language.userLanguage === 'de') {
        content = await load('-de');
      } else {
        content = await load();
      }
      setContentMain(content);
    };
    loadContent();
  }, [state.language.userLanguage]);

  return <MdDocs content={contentMain} />;
};

export default Page;

/**
 *
 * Note: Option (!!) - does not look at the global web-pack loader
 * option (test) to handle file extentions
 * import content from '!!raw-loader!../../docs/src/pages/guides/api/index.md';
 *
 * as raw-loader is defined in the web-pack configuration to handle .md files
 * import content from "../../docs/src/pages/guides/api/index.md";
 *
 */

/**
 * import React from 'react';
 * import { MdDocs } from '../../docs/src/modules/components/md';
// import content from '../../docs/src/pages/guides/api/index.md';
 * const Page = () => {
 *   return <MdDocs content={content} />;
 * };
 * export default Page;
 */
