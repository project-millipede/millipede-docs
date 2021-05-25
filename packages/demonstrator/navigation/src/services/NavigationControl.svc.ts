import { PartialViewElement, TView } from '../types';

export const navigateById = (
  fromViewElementId: string,
  toViewElementId: string,
  views: Array<TView>,
  viewElements: Array<PartialViewElement>
) => {
  // find the view element, currently centered
  // has to move from its current location (center) to a left or right placeholder
  const fromViewElement = viewElements.find(
    viewElement => viewElement.id === fromViewElementId
  );

  // find the the view elements parent position in all views
  const fromViewIndex = views.findIndex(
    view => view.id === fromViewElement.parentId
  );

  // find the next view element, which has to be centered
  const toViewElement = viewElements.find(
    viewElement => viewElement.id === toViewElementId
  );

  // find the the view elements parent position in all views
  const toViewIndex = views.findIndex(
    view => view.id === toViewElement.parentId
  );

  const distance = toViewIndex - fromViewIndex;

  // does not use distance (Vorzeichen) to indicate direction
  const moveToRight = toViewIndex > fromViewIndex;

  // currentViewElements and nextViewElements have to be identical in size
  const nextViewElements = viewElements.reduce<Array<PartialViewElement>>(
    (acc, viewElement) => {
      const fromView = views.find(view => view.id === viewElement.parentId);

      const fromViewIndex = views.findIndex(
        view => view.id === viewElement.parentId
      );

      const toView = views[fromViewIndex - distance];

      return [
        ...acc,
        {
          ...viewElement,
          parentId: toView.id,
          previousParentId: fromView.id
        }
      ];
    },
    []
  );

  return {
    nextViewElements,
    direction: moveToRight
  };
};
