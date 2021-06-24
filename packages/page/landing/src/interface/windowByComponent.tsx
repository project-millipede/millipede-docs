import { CustomIcon } from '@app/components';
import { ContentTypes } from '@app/types';
import { Box, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { TopReveal } from '../animation/framer/components/text/TopReveal';

interface WindowProps {
  windowStackData?: Array<ContentTypes.OverviewProps>;
  index: number;
}

const Window: FC<WindowProps> = ({ windowStackData, index }) => {
  const { push } = useRouter();

  const handleSelect = (
    topic: ContentTypes.OverviewProps,
    section: ContentTypes.Section
  ) => {
    push({
      pathname: `/`,
      query: {
        feature: topic.id,
        aspect: section.id
      }
      // hash: `#head-${topic.id}-${section.id}`
    });
  };

  const topic =
    windowStackData &&
    windowStackData.length >= index &&
    windowStackData[index];

  const { id: topicId } = topic;

  return topic != null ? (
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
                key={`topic-${topicId}-section-${sectionId}`}
                onClick={_e => {
                  handleSelect(topic, section);
                }}
              >
                <CustomIcon icon={section.icon} />
              </IconButton>
            );
          })}
      </Box>
    </Box>
  ) : null;
};

export default Window;
