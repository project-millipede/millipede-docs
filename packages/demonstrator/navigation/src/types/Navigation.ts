import { TView } from './View';
import { PartialViewElement } from './ViewElement';

export interface NavigationState {
  views: Array<TView>;
  viewElements: Array<PartialViewElement>;
}
