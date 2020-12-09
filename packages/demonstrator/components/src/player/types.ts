export interface Step {
  start: number;
  end: number;
  label: string;
  selector: string;
  description: string;
  timelineId?: string;
}
