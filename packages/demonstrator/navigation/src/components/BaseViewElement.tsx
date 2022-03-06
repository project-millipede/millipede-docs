import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { features } from '../';
import { BaseViewElementProps } from '../types';

export const BaseViewElement: FC<BaseViewElementProps> = ({
  viewId,
  render
}) => {
  const {
    view: {
      navigation: {
        selector: { parentIdSelector }
      }
    },
    app: {
      states: { appCompositionState }
    }
  } = features;

  /**
   * The purpose of determining and forwarding the parentId from a base component
   * is to trigger common adustment tasks in an actual view component.
   * When reparenting gets executed, a child gets assigned to a new parent;
   * the parentId of view component changes.
   * This change is seen within an effect function of a view component and triggers,
   * e.g., a restoration of the scroll position whenever the component reparents.
   */
  const parentId = useRecoilValue(parentIdSelector(viewId));

  const { isMobile } = useRecoilValue(appCompositionState);

  return (
    <div
      id={viewId} // used for synchronizing the animation queue
      key={viewId}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      {render(parentId, isMobile)}
    </div>
  );
};
