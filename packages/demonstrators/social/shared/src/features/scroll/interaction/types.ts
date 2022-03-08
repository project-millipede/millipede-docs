export const SliceVariant = {
  header: 'header',
  media: 'media',
  content: 'content',
  sentiment: 'sentiment',
  comments: 'comments'
} as const;

export type TSliceVariant = typeof SliceVariant[keyof typeof SliceVariant];

export interface InteractionOption {
  activeIds: { [key: string]: boolean };
}

// export interface InteractionOption {
//   activeIds: { [key in TSliceVariant]: boolean };
// }
