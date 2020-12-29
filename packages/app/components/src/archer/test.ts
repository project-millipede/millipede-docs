/**
 * Detect browser support for a given API
 * @param {Array<string>} api the API to be tested
 * @returns {Boolean} return true if browser has support
 */
export const browserSupports = api => {
  switch (api) {
    case 'ResizeObserver':
      return typeof ResizeObserver !== 'undefined';
    default:
      // There is no assigned value by default, so return undefined
      return undefined;
  }
};
