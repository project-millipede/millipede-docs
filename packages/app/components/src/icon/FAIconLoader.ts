import { library } from '@fortawesome/fontawesome-svg-core';
import { faRocket, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const loadFAIcons = () => {
  library.add(faUserCircle, faRocket);
};
