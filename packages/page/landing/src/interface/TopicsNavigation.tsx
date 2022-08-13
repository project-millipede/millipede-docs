import { CustomIcon, HiddenUnderlineLink } from '@app/components';
import { PageTypes } from '@app/types';
import { IconButton } from '@mui/material';
import { FC } from 'react';

export const TopicsNavigation: FC<{
  topicId: string;
  sectionId: string;
  sectionIcon: PageTypes.Icon;
}> = ({ topicId, sectionId, sectionIcon }) => {
  return (
    <IconButton
      component={HiddenUnderlineLink}
      href={{
        pathname: '/',
        query: {
          feature: topicId,
          aspect: sectionId
        },
        hash: `feature-${topicId}-aspect-${sectionId}`
      }}
      shallow
      prefetch={false}
    >
      <CustomIcon icon={sectionIcon} />
    </IconButton>
  );
};
