export type PageParamsField = {
  slug: Array<string>;
};

export type PageParams<P extends object = {}, E extends object = {}> = E & {
  params: PageParamsField & P;
};

export type IdToParams<P extends PageParams> = (id: string) => P;
export type ParamsToId<P extends PageParams> = (params: P) => string;

export type LocalizedBPageParams = PageParams<
  {},
  {
    locale: string;
  }
>;

export const paramsToId = (extension: string) => ({
  params,
  locale
}: LocalizedBPageParams): string => {
  return params.slug.join('/') + '/' + locale + extension;
};

export const idToLocale = (id: string) => {
  const parts = id.split('/');
  const [locale] = parts[parts.length - 1].split('.');

  if (!locale) {
    throw new Error(`Failed to determine locale of page "${id}".`);
  }

  return locale;
};

export const idToSlug = (id: string) => {
  const slug = id.split('/').slice(0, -1);
  if (slug.length === 0) {
    throw new Error(`Failed to determine slug of page "${id}".`);
  }

  return slug;
};

export const idToPathParams: IdToParams<LocalizedBPageParams> = id => {
  return {
    params: {
      slug: idToSlug(id)
    },
    locale: idToLocale(id)
  };
};
