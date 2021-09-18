export const isBrowser = () => typeof window !== 'undefined';
export const supportWebShare = () => isBrowser() && window.navigator.share;
