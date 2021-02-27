export const measure = (element: HTMLElement): Partial<DOMRect> => {
  if (element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
};

export const measureOffset = (
  rectStart: Partial<DOMRect>,
  rectEnd: Partial<DOMRect>
): Partial<DOMRect> => {
  return {
    x: -(rectEnd.x - rectStart.x),
    y: -(rectEnd.y - rectStart.y)
  };
};
