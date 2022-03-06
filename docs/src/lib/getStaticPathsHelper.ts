export const idToSlug = (id: string) => {
  const slug = id.split('/').slice(0, -1);
  if (slug.length === 0) {
    throw new Error(`Failed to determine slug of page ${id}.`);
  }
  return slug;
};

export const idToLocale = (id: string) => {
  const parts = id.split('/');
  const [locale] = parts[parts.length - 1].split('.');
  if (!locale) {
    throw new Error(`Failed to determine locale of page ${id}.`);
  }
  return locale;
};

export const idToPathParams = (id: string, locale = undefined) => {
  return {
    params: {
      slug: idToSlug(id)
    },
    locale: locale ? locale : idToLocale(id)
  };
};

export const idToBlogSlug = (id: string) => {
  return id.replace('.mdx', '');
};

export const idToPathBlogParams = (id: string, locale: string) => {
  return {
    params: {
      slug: idToBlogSlug(id)
    },
    locale: locale
  };
};
