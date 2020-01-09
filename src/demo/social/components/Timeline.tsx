import { Button, ButtonGroup } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { TimelineActions } from 'docs/src/modules/redux/features/actionType';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useHoux } from 'houx';
import React, { FC, useRef } from 'react';

import { RootState } from '../../../../docs/src/modules/redux/reducers';
import { useTranslation } from '../../../../i18n';
import CommentEditor from './CommentEditor';
import { PostProps } from './Post';
import Search from './Search';
import { handleCreatePost } from './Timeline.svc';

// import { TimelineActions } from '../../../../../../../docs/src/modules/redux/features/actionType';
interface TimelineProps {
  fontColor?: string;

  // input parameters for height calculation
  lineGap?: number;
  fontSize?: number;

  // animation property
  stagger?: number;
  loop?: boolean;

  Comp: React.FC<PostProps>;
  timelineId?: number;
}

const ns = 'pages/pidp/use-case/recognition/index';

const Timeline: FC<TimelineProps> = ({
  fontSize,
  fontColor,
  stagger,
  loop,
  // lineGap
  Comp,
  timelineId
}) => {
  const [displayEditor, setDisplayEditor] = React.useState(false);

  const { t } = useTranslation(ns);

  const {
    dispatch,
    state: {
      timeline: {
        entities,
        entities: { timelines }
      }
    }
  }: {
    dispatch: React.Dispatch<TimelineActions>;
    state: RootState;
  } = useHoux();

  const containerRef = useRef<HTMLDivElement>(null);

  // Add staggering effect to the children of the container
  const containerVariants = {
    before: {},
    after: { transition: { staggerChildren: stagger } }
  };

  // Variants for animating the text
  const textVariants: Variants = {
    before: {
      y: -fontSize * 1.1,
      opacity: 0.6
    },
    after: {
      y: 0,
      opacity: 1,
      transition: loop
        ? {
            ease: 'easeOut',
            yoyo: Infinity,
            repeatDelay: 3
          }
        : {
            ease: 'easeOut'
          }
    }
  };

  let postIds: Array<number> = [];

  if (timelines[timelineId]) {
    postIds = timelines[timelineId].posts;
  }

  return postIds.length > 0 ? (
    <motion.div
      key={`timeline-${timelineId}`}
      ref={containerRef}
      style={{
        width: '100%',

        // re-activated
        // height: (fontSize * 1.1 + lineGap) * postIds.length * 2 + 30,

        maxHeight: '800px',
        overflowY: 'auto'
      }}
      initial={'before'}
      animate={'after'}
      variants={containerVariants}
    >
      <Search />
      {displayEditor ? (
        <CommentEditor
          create={text =>
            handleCreatePost(timelineId, text, entities, dispatch, () => {
              setDisplayEditor(false);
            })
          }
          isComment={false}
        />
      ) : (
        <ButtonGroup
          variant='text'
          color='primary'
          aria-label='outlined primary button group'
          style={{ width: '100%' }}
        >
          <Button
            variant='text'
            color='primary'
            startIcon={<ChatBubbleOutlineIcon />}
            onClick={() => setDisplayEditor(!displayEditor)}
            aria-label={t('content_create')}
            style={{ margin: 'auto' }}
          >
            {t('content_create')}
          </Button>
        </ButtonGroup>
      )}
      <AnimatePresence>
        {postIds.map(postId => {
          return (
            <motion.div
              key={`${timelineId}-${postId}`}
              style={{
                width: '100%',

                // re-activated
                // height: fontSize * 1.1,

                // disabled
                height: '100%',

                // re-activated
                // y: (fontSize * 1.1 + lineGap) * index,
                overflow: 'hidden'
              }}
              // new because of AnimatePresence
              exit={{ opacity: 0 }}
            >
              <motion.div
                style={{
                  // re-activated
                  // size: '100%',
                  // re-activated
                  // fontSize,

                  color: fontColor,

                  margin: 'auto',
                  display: 'flex',
                  outline: 0,
                  position: 'relative',
                  justifyContent: 'center'
                }}
                // new
                // animate={['controls']}
                variants={textVariants}
              >
                <Comp timelineId={timelineId} postId={postId} />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  ) : null;
};

Timeline.defaultProps = {
  lineGap: 0,
  fontSize: 417,
  // fontSize: 1120,
  fontColor: '#000000',
  stagger: 0.5,
  loop: false
};

export default Timeline;
