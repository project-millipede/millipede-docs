export interface Step {
  id?: string;
  start: number;
  end: number;
  label?: string;
  selector?: string | (() => void);
  description: string;
  viewSelector?: string;
}

export interface PlayListItem {
  id: string;
  title: string;
  description: string;
  steps: Array<Step>;
}
