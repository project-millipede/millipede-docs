import { Components as RenderComponents } from '@app/render-utils';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { Components } from '@page/layout';
import { FC } from 'react';

import { StyledTypography } from '../components/head/InteractiveHead.svc';

const {
  Media: { MediaConsumer },
  Suspense: { SuspenseWrapper }
} = RenderComponents;

export type HeaderProps = {
  // id generated through slug
  id: string;
  variant: Variant;
  children: string;
};

export const Header: FC<HeaderProps> = ({ id, variant, children }) => {
  return (
    <>
      <MediaConsumer>
        {({ media: { mobile, desktop } }) => {
          return (
            <>
              <SuspenseWrapper media={mobile}>
                <Typography
                  key={id}
                  variant={variant}
                  className={mobile.className}
                >
                  {children}
                </Typography>
              </SuspenseWrapper>
              <SuspenseWrapper media={desktop}>
                <StyledTypography
                  key={id}
                  variant={variant}
                  className={desktop.className}
                >
                  <Components.Head.InteractiveHead id={id}>
                    {children}
                  </Components.Head.InteractiveHead>
                </StyledTypography>
              </SuspenseWrapper>
            </>
          );
        }}
      </MediaConsumer>
    </>
  );
};
