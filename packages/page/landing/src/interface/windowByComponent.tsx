import { CustomIcon, HiddenUnderlineLink } from '@app/components';
import { ContentTypes } from '@app/types';
import { Box, IconButton } from '@mui/material';
import { FC } from 'react';

import { TopReveal } from '../animation/framer/components/text/TopReveal';

interface WindowProps {
  windowStackData?: Array<ContentTypes.OverviewProps>;
  index?: number;
}

const Window: FC<WindowProps> = ({ windowStackData, index }) => {
  const topic =
    windowStackData &&
    windowStackData.length >= index &&
    windowStackData[index];

  const { id: topicId } = topic;

  return (
    <Box>
      <TopReveal
        id={`topic-${topic.category}-animation`}
        text={[...topic.title, ...topic.subTitle]}
      />
      <Box>
        {topic.sections &&
          topic.sections.map(section => {
            const { id: sectionId } = section;
            return (
              <IconButton
                component={HiddenUnderlineLink}
                key={`topic-${topicId}-section-${sectionId}`}
                href={{
                  pathname: '/',
                  query: {
                    feature: topic.id,
                    aspect: section.id
                  },
                  hash: `feature-${topic.id}-aspect-${section.id}`
                }}
                prefetch={false}
                shallow
              >
                <CustomIcon icon={section.icon} />
              </IconButton>
            );
          })}
      </Box>
    </Box>
  );
};

export default Window;
