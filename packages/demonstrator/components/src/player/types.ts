export interface Step {
  start: number;
  end: number;
  label?: string;
  selector: string | Function;
  description: string;
}

export interface PlayListItem {
  id: string;
  title: string;
  description: string;
  steps: Array<Step>;
}
