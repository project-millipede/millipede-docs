export const measure = (element: HTMLElement) => {
  if (element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;
    return { x, y, width: rect.width, height: rect.height };
  }
};

export const measureOffset = (
  rectStart: Partial<DOMRect>,
  rectEnd: Partial<DOMRect>
) => {
  const offSet: Partial<DOMRect> = {
    x: -(rectEnd.x - rectStart.x),
    y: -(rectEnd.y - rectStart.y)
  };
  return offSet;
};
