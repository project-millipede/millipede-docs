export const Position = {
  left: 'left',
  middle: 'middle',
  right: 'right'
} as const;

export type TPosition = typeof Position[keyof typeof Position];

export interface TView {
  id: string; // parentId
  position: TPosition;
  backgroundColor?: string;
}
