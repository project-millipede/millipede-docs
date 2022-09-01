import { HooksUtils } from '@app/render-utils';
import { createContext, FC, ReactNode } from 'react';

import { Media } from '../../types';
import { Boundary, useTheme } from './use-theme';

const defaultValue: Media = {
  active: true,
  isPending: false,
  className: null
};

interface MediaMap {
  [key: string]: Media;
}

const MediaContext = createContext<{
  media: MediaMap;
}>({
  media: {
    mobile: defaultValue,
    desktop: defaultValue
  }
});

export const MediaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeMobile, isPendingMobile] = HooksUtils.useMedia(
    'only screen and (max-width : 900px)',
    true
  );
  const classNameMobile = useTheme(Boundary.upper);

  // const classNameMobile = useTheme(Breakpoint.md, Boundary.upper);

  const [activeDesktop, isPendingDesktop] = HooksUtils.useMedia(
    'only screen and (min-width : 900px)',
    true
  );

  const classNameDesktop = useTheme(Boundary.lower);

  // const classNameDesktop = useTheme(Breakpoint.md, Boundary.lower);

  return (
    <MediaContext.Provider
      value={{
        media: {
          mobile: {
            active: activeMobile,
            isPending: isPendingMobile,
            className: classNameMobile
          },
          desktop: {
            active: activeDesktop,
            isPending: isPendingDesktop,
            className: classNameDesktop
          }
        }
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const MediaConsumer = MediaContext.Consumer;
