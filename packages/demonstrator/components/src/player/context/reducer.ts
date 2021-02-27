export const init = (maxStepsCount: number) => {
  return <const>{ type: 'INIT', maxStepsCount };
};

export const reset = () => {
  return <const>{ type: 'RESET' };
};

export const toggle = () => {
  return <const>{ type: 'TOGGLE' };
};
export const prev = () => {
  return <const>{ type: 'PREV' };
};

export const next = () => {
  return <const>{ type: 'NEXT' };
};

export const seek = (target: number) => {
  return <const>{ type: 'SEEK', target };
};

export const auto = () => {
  return <const>{ type: 'AUTO' };
};

export type Action = ReturnType<
  | typeof init
  | typeof reset
  | typeof toggle
  | typeof prev
  | typeof next
  | typeof seek
  | typeof auto
>;

export interface StepState {
  target: number;
  playing: boolean;
  back: boolean;
  maxStepsCount?: number;
}

export const initialState: StepState = {
  target: -1,
  playing: false,
  back: false,
  maxStepsCount: 0
};

export const reducer = (state: StepState, action: Action) => {
  const { target, playing, maxStepsCount } = state;
  switch (action.type) {
    case 'INIT': {
      return {
        ...state,
        target: 0,
        maxStepsCount: action.maxStepsCount
      };
    }
    case 'RESET':
      return {
        ...state,
        ...initialState
      };
    case 'TOGGLE': {
      return {
        ...state,
        playing: !playing
      };
    }
    case 'PREV': {
      const newTarget = Math.max(target - 1, 0);
      return {
        ...state,
        target: newTarget,
        back: newTarget < target
      };
    }
    case 'NEXT': {
      const newTarget = Math.min(target + 1, maxStepsCount);
      return {
        ...state,
        target: newTarget,
        back: newTarget < target
      };
    }
    case 'SEEK': {
      const newTarget = action.target;
      return {
        ...state,
        target: newTarget,
        back: newTarget < target
      };
    }
    case 'AUTO': {
      const newTarget = Math.min(target + 1, maxStepsCount);
      return {
        ...state,
        target: newTarget,
        back: newTarget < target
      };
    }
    default:
      return state;
  }
};
