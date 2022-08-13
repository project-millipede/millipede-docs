import { HooksUtils } from '@app/render-utils';
import { ContentTypes } from '@app/types';
import { I18n } from '@app/utils';
import { Box } from '@mui/material';
import { FC, useState } from 'react';

import { TopReveal } from '../animation/framer/components/text/TopReveal';
import { TopicsNavigation } from './TopicsNavigation';

const animationTimeout = 5000;

interface TopicsHeadMobileProps {
  className?: string;
}

const TopicsHeadMobile: FC<TopicsHeadMobileProps> = ({ className }) => {
  const { t } = I18n.useTranslation('pages/topics/index');

  const topics = t<Array<ContentTypes.Topic>>(
    'topics',
    {},
    {
      returnObjects: true,
      fallback: []
    }
  );

  const [index, setIndex] = useState(0);

  HooksUtils.useTimeout(() => {
    if (topics.length - 1 > index) {
      setIndex(state => state + 1);
      return;
    }
    setIndex(0);
  }, animationTimeout);

  const { id: topicId, ...topic } = topics[index];

  return (
    <Box sx={{ textAlign: 'center' }} className={className}>
      <TopReveal
        id={`topic-${topicId}-mobile-animation`}
        text={[...topic.title, ...topic.subTitle]}
      />
      <Box>
        {topic.sections &&
          topic.sections.map(section => {
            const { id: sectionId, icon: sectionIcon } = section;
            return (
              <TopicsNavigation
                key={`topic-${topicId}-section-${sectionId}-mobile-navigation`}
                topicId={topicId}
                sectionId={sectionId}
                sectionIcon={sectionIcon}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default TopicsHeadMobile;
