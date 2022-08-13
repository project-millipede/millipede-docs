import { Components as RenderComponents } from '@app/render-utils';
import { FC } from 'react';

import { TopicsHeadDesktop } from '../interface/TopicsHeadDesktop';
import TopicsHeadMobile from '../interface/TopicsHeadMobile';

const {
  Media: { MediaConsumer },
  Suspense: { SuspenseWrapper }
} = RenderComponents;

export const TopicsHead: FC = () => {
  return (
    <>
      <MediaConsumer>
        {({ media: { mobile, desktop } }) => {
          return (
            <>
              <SuspenseWrapper media={mobile}>
                <TopicsHeadMobile className={mobile.className} />
              </SuspenseWrapper>
              <SuspenseWrapper media={desktop}>
                <TopicsHeadDesktop className={desktop.className} />
              </SuspenseWrapper>
            </>
          );
        }}
      </MediaConsumer>
    </>
  );
};
