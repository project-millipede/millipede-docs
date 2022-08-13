import 'react';

declare module 'react' {
  /**
   * Allows components to avoid undesirable loading states by waiting for content to load
   * before transitioning to the next screen. It also allows components to defer slower,
   * data fetching updates until subsequent renders so that more crucial updates can be
   * rendered immediately.
   *
   * The `useTransition` hook returns two values in an array.
   *
   * The first is a boolean, React’s way of informing us whether we’re waiting for the transition to finish.
   * The second is a function that takes a callback. We can use it to tell React which state we want to defer.
   *
   * **If some state update causes a component to suspend, that state update should be wrapped in a transition.**`
   *
   * @see https://reactjs.org/docs/concurrent-mode-reference.html#usetransition
   */
  export function useTransition(): [boolean, TransitionStartFunction];

  export function useId(): string;
}
