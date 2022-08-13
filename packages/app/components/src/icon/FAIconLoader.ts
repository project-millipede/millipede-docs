import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
  faBalanceScaleLeft,
  faChessBoard,
  faGhost,
  faHashtag,
  faLightbulb,
  faLowVision,
  faRocket,
  faRoute,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

export const loadFAIcons = () => {
  library.add(
    faUserCircle,
    faRocket,
    faGhost,
    faRoute,
    faLowVision,
    faBalanceScaleLeft,
    faLightbulb,
    faChessBoard,
    faHashtag
  );

  // Replace any existing <i> tags with <svg> and set up a MutationObserver to
  // continue doing this as the DOM changes.
  dom.watch();
};
