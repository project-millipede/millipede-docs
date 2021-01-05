import { PageTypes } from '@app/types';
import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator';

export type ContentWithMetadata = {
  content: string;
  metaData: PageTypes.MetaData;
};

export const getMetadata = async (
  data: Buffer
): Promise<ContentWithMetadata> => {
  const { data: metaData, content } = matter(data);

  const { disableToc } = metaData;

  return {
    metaData: {
      ...metaData,
      timeToRead: readingTime(content),
      disableToc: disableToc || false
    },
    content
  };
};
