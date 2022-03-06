import { createMedia } from '@artsy/fresnel';

// Correspond to MUI breakpoints
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

const AppMedia = createMedia({ breakpoints });

/**
 * Styles for SSR.
 */
export const mediaStyles = AppMedia.createMediaStyle();

export const {
  /**
   * This component provides an easy-to-use API for responding to media
   * queries.  This adds a wrapper div over the component with fresnel CSS
   * classes to respond to media queries.
   *
   * If you don't need the wrapper div, use the MediaFragment component
   * instead.
   */
  Media,

  /**
   * This provides context data related to the media query component.
   */
  MediaContextProvider
} = AppMedia;
