export interface Viewport {
  viewportItem: { [key: string]: { id: string; offsetTop: number } };
  offsetTop: number;
}

export interface ViewportNext {
  viewportItem: { id: string; offsetTop?: number };
}
