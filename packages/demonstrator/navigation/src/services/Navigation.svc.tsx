import { TViewElement } from '../types';

export const getViewElement = (
  viewElements: Array<TViewElement>,
  viewElementId: string
) => {
  return viewElements.find(viewElement => viewElement.id === viewElementId);
};

export const getComponent = (viewElement: TViewElement, _update = true) => {
  const { key, id, component: Component } = viewElement;

  return Component ? (
    <Component
      key={key}
      layoutId={id}
      layout={'position'}
      // layoutId={update ? id : undefined}
      // layout={update ? 'position' : false}
    />
  ) : null;
};
