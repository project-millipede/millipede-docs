import { library } from '@fortawesome/fontawesome-svg-core';
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
};
