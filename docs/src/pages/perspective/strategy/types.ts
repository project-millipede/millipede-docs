import { ReactNode } from 'react';

export type AnchorPositionType = 'top' | 'bottom' | 'left' | 'right' | 'middle';

export type RelationType = {
  targetId: string;
  targetAnchor: AnchorPositionType;
  sourceAnchor: AnchorPositionType;
  label?: ReactNode;
  style?: ArrowStyleType;
};

export type EntityRelationType = {
  id: string;
  anchor: AnchorPositionType;
};

export type SourceToTargetType = {
  source: EntityRelationType;
  target: EntityRelationType;
  label?: ReactNode;
  style?: ArrowStyleType;
};

export type ArrowStyleType = {
  arrowLength: number;
  arrowThickness: number;
  strokeColor: string;
  strokeWidth: number;
  strokeDasharray?: string;
  noCurves?: boolean;
};
