import { TViewElement } from '../types';

export const getViewElement = (
  viewElements: Array<TViewElement>,
  viewElementId: string
) => {
  return viewElements.find(viewElement => viewElement.id === viewElementId);
};

export const getComponent = (viewElement: TViewElement) => {
  const {
    id,
    baseComponent: BaseComponent,
    component: Component
  } = viewElement;

  return (
    <BaseComponent
      viewId={id}
      /**
       * 2nd render function
       * Forward base information a view-element requires;
       * see the comments in the base-view-element component for more details.
       */
      render={(parentId, isMobile) => (
        <Component parentId={parentId} isMobile={isMobile} />
      )}
    />
  );
};
