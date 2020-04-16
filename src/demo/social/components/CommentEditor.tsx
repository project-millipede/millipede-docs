import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import { EditorState } from 'draft-js';
import MUIRichTextEditor from 'mui-rte';
import React, { FC, useCallback, useState } from 'react';

import { useTranslation } from '../../../../i18n';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formHelperText: {
      color: theme.palette.error.main
    }
  })
);

interface CommentEditorProps {
  isComment: boolean;
  create?: (content: string) => void;
}

const ns = 'pages/pidp/use-case/recognition/index';

const CommentEditor: FC<CommentEditorProps> = ({ isComment, create }) => {
  const { t } = useTranslation(ns);

  const title = t(isComment ? 'comment_create' : 'content_create');
  const postButtonTitle = t(isComment ? 'comment_publish' : 'content_publish');
  const contentEmpty = t('content_empty');

  const contentInput = t('content_input');

  const [commentState, setCommentState] = useState(EditorState.createEmpty());
  const [commentError, setCommentError] = useState(false);
  const classes = useStyles();

  const handlePostComment = useCallback(() => {
    if (commentState.getCurrentContent().getPlainText().trim()) {
      create(commentState.getCurrentContent().getPlainText().trim());
      return;
    }
    setCommentError(true);
  }, [commentState]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '16px' }}>
      <Typography variant='h4'>
        <strong>{title}</strong>
      </Typography>
      <NoSsr>
        <MUIRichTextEditor
          onChange={data => {
            setCommentError(false);
            setCommentState(data);
          }}
          label={contentInput}
        />
      </NoSsr>
      {commentError && (
        <Typography className={classes.formHelperText}>
          {contentEmpty}
        </Typography>
      )}
      <Button
        variant='text'
        color='primary'
        onClick={handlePostComment}
        aria-label={postButtonTitle}
      >
        {postButtonTitle}
      </Button>
    </div>
  );
};

CommentEditor.defaultProps = {
  isComment: true
};

export default CommentEditor;
