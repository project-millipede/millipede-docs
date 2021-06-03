export type SheetHandleProps = {
  reset: () => void;
  snapTo: (snapIndex: number) => void;
  snapToPx: (height: number, offsetTop: number) => void;
};
