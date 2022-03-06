import { PartialViewElement } from '../types';

export const animateCenterToLeftOrRight = (
  viewElement: PartialViewElement,
  moveToRight: boolean
) => {
  if (moveToRight) {
    const frame = new KeyframeEffect(
      document.getElementById(viewElement.id),
      [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
      {
        duration: 700,
        easing: 'ease-in-out', // 'linear', a bezier curve, etc. delay: 10, //milliseconds
        fill: 'both', //'backwards', 'both', 'none', 'auto'
        composite: 'accumulate'
      }
    );
    const animation = new Animation(frame, document.timeline);
    animation.play();
  } else {
    const frame = new KeyframeEffect(
      document.getElementById(viewElement.id),
      [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
      {
        duration: 700,
        easing: 'ease-in-out', // 'linear', a bezier curve, etc. delay: 10, //milliseconds
        fill: 'both', //'backwards', 'both', 'none', 'auto'
        composite: 'accumulate'
      }
    );
    const animation = new Animation(frame, document.timeline);
    animation.play();
  }
};

export const animateFromLeftToCenter = (viewElement: PartialViewElement) => {
  const frame = new KeyframeEffect(
    document.getElementById(viewElement.id),
    [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
    {
      duration: 700,
      easing: 'ease-in-out', // 'linear', a bezier curve, etc. delay: 10, //milliseconds
      fill: 'both', //'backwards', 'both', 'none', 'auto'
      composite: 'accumulate'
    }
  );
  const animation = new Animation(frame, document.timeline);
  animation.play();
};

export const animateFromRightToCenter = (viewElement: PartialViewElement) => {
  const frame = new KeyframeEffect(
    document.getElementById(viewElement.id),
    [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }],
    {
      duration: 700,
      easing: 'ease-in-out', // 'linear', a bezier curve, etc. delay: 10, //milliseconds
      fill: 'both', //'backwards', 'both', 'none', 'auto',
      composite: 'accumulate'
    }
  );
  const animation = new Animation(frame, document.timeline);
  animation.play();
};
