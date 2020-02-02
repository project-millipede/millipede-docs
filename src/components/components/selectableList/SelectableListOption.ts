import { Song } from '../../services/audio';
import { PREVIEW } from '../../app/previews/Preview';

export interface SelectableListOption {
  label: string;
  value: any;
  viewId?: string;
  preview?: PREVIEW;
  link?: string;
  image?: string;
  songIndex?: number;
  playlist?: Array<Song>;
}
