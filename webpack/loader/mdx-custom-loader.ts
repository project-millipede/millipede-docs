import { getOptions } from 'loader-utils';
import webpack from 'webpack';

// import parser from './mdx-parser';

export const loader = async function(this: webpack.loader.LoaderContext, source: string) {
  const callback: webpack.loader.loaderCallback = this.async();

  const options = getOptions(this);

  this.cacheable && this.cacheable();

  const remarkPlugins = [];

  // const response = await parser(
  //   source,
  //   Object.assign({}, options, { filePath: this.resourcePath, remarkPlugins })
  // );

  // callback(null, response.code);
  callback(null, null);
};

export default loader;
