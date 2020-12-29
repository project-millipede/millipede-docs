const defaultEventInit: EventInit = {
  cancelable: true,
  bubbles: true
};

export const createMouseEvent = (
  type: string,
  eventInitDict?: MouseEventInit
) => {
  return new MouseEvent(type, {
    ...defaultEventInit,
    ...eventInitDict
  });
};

export const click = (target: HTMLElement) => {
  target.dispatchEvent(createMouseEvent('mousedown', { cancelable: true }));
  target.dispatchEvent(createMouseEvent('mouseup', { cancelable: true }));
  target.dispatchEvent(createMouseEvent('click', { cancelable: true }));
};
