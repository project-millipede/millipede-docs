import { isString } from 'util';

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const titleRegExp = /# (.*)[\r\n]/;
const descriptionRegExp = /<p class="description">(.*)<\/p>[\r\n]/;
const headerKeyValueRegExp = /(.*): (.*)/g;
const emptyRegExp = /^\s*$/;

interface Headers {
  components?: Array<string>;
  filename?: string;
}

export const getHeaders = (markdown: string) => {
  const header = markdown.match(headerRegExp);

  if (!header) {
    return {
      components: []
    };
  }

  const firstHeader = header[1];

  let regexMatches;
  const headers: Headers = {};

  /* eslint-disable prefer-destructuring */
  /* eslint-disable no-cond-assign */
  while ((regexMatches = headerKeyValueRegExp.exec(firstHeader)) !== null) {
    headers[regexMatches[1]] = regexMatches[2];
  }

  if (headers.components) {
    if (isString(headers.components)) {
      headers.components = headers.components.split(', ').sort();
    }
  } else {
    headers.components = [];
  }

  return headers;
};

export const demoRegexp = /^"demo": "(.*)"/;

export const getContents = markdown => {
  return markdown
    .replace(headerRegExp, '') // Remove header information
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter(content => !emptyRegExp.test(content)); // Remove empty lines
};

export const getTitle = markdown => {
  const matches = markdown.match(titleRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing title in the page');
  }

  return matches[1];
};

export const getDescription = markdown => {
  const matches = markdown.match(descriptionRegExp);

  if (!matches || !matches[1]) {
    throw new Error('Missing description in the page');
  }

  return matches[1];
};
