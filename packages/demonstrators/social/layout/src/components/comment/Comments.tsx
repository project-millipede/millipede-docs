import { CollectionUtil } from '@app/utils';
import { Types } from '@demonstrators-social/data';
import { ExpandMore } from '@mui/icons-material';
import { Avatar, CardActions, CardContent, CardHeader, IconButton, IconButtonProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatDistance } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { forwardRef, ForwardRefRenderFunction, Fragment, useMemo, useState } from 'react';

type StyledIconButtonProps = IconButtonProps & {
  open: boolean;
};

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: prop => prop !== 'open'
})<StyledIconButtonProps>(({ theme, open }) => ({
  marginLeft: 'auto',
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  ...(open && {
    transform: 'rotate(180deg)'
  })
}));

interface CommentsProps {
  timelineId: string;
  postId: string;
  comments?: Array<Types.Comment>;
}

export const Comments: ForwardRefRenderFunction<
  HTMLDivElement,
  CommentsProps
> = ({ timelineId, postId, comments = [] }, ref) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const processedComments = useMemo(() => {
    /**
     * The comments array is read-only.
     * The array sort operation is not immutable; we have to clone the source array first and use that for the sort operation.
     * An alternative is to create a writable selector and apply the sort operation upon insertion (use set function of the selector).
     */
    return Array.from(comments)
      .sort(CollectionUtil.Array.compareDescFn(item => item.content.createdAt))
      .map(comment => {
        const {
          content: { createdAt }
        } = comment;

        return {
          ...comment,
          content: {
            ...comment.content,
            createdAt: formatDistance(createdAt, new Date(), {
              locale: enGB
            })
          }
        };
      });
  }, [comments.length]);

  const commentComps = processedComments.map(comment => {
    const {
      commenter: {
        profile: { firstName, lastName, avatar }
      },
      id: commentId,
      content: { text, createdAt }
    } = comment;

    return (
      <Fragment
        key={`timeline-${timelineId}-post-${postId}-comment-${commentId}`}
      >
        <CardHeader
          avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatar} />}
          title={`${firstName} ${lastName}`}
          subheader={createdAt}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
          </Typography>
        </CardContent>
      </Fragment>
    );
  });

  const defaultCommentComps = commentComps.slice(0, 3);
  const restCommentComps = commentComps.slice(3, commentComps.length);

  const expandButton =
    restCommentComps.length > 0 ? (
      <CardActions
        disableSpacing
        key={`timeline-${timelineId}-post-${postId}-comment-actions`}
      >
        <StyledIconButton open={expanded} onClick={handleExpandClick}>
          <ExpandMore />
        </StyledIconButton>
      </CardActions>
    ) : null;

  return (
    <div ref={ref}>
      {[
        ...defaultCommentComps,
        expandButton,
        expanded ? restCommentComps : null
      ]}
    </div>
  );
};

export default forwardRef(Comments);
