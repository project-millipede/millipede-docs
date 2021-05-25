import { EffectRef } from '@huse/effect-ref';
import { atom } from 'recoil';

export interface AppLayout {
  appContainer: EffectRef<HTMLElement>;
  bottomContainer: EffectRef<HTMLElement>;
}

export const appLayoutInitialState: AppLayout = {
  appContainer: undefined,
  bottomContainer: undefined
};

export const appLayoutState = atom({
  key: 'app-layout',
  default: appLayoutInitialState
});

export interface AppComposition {
  isMobile: boolean;
}

export const appCompositionInitialState: AppComposition = {
  isMobile: true
};

export const appCompositionState = atom({
  key: 'app-composition',
  default: appCompositionInitialState
});
