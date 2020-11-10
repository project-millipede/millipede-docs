/* eslint-disable import/no-extraneous-dependencies */
import { getOptions } from 'loader-utils';

import { parser } from './mdx-parser';

export async function loader(
  this,
  source: string
) {
  const callback = this.async();

  const options = getOptions(this);

  if (this.cacheable) {
    this.cacheable();
  }

  const remarkPlugins = [];

  const response = await parser(source, {
    ...options,
    filePath: this.resourcePath,
    remarkPlugins
  });

  callback(null, response.code);
}

export default loader;
