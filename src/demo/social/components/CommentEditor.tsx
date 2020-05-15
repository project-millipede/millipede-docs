import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import { EditorState } from 'draft-js';
import MUIRichTextEditor from 'mui-rte';
import React, { FC, useCallback, useState } from 'react';

import { useTranslation } from '../../../../i18n';

/**
 * The following style override is necessary because of a bug in the mui-rte library.
 * The commit referenced introduced a regression defining positions for container and placeholder elements.
 * To make it work override the container and placeholder position attribute with unset.
 * https://github.com/niuware/mui-rte/commit/7035c222a44fc2e232863c895c8dbfc82605c869
 */

const useStylesRTE = makeStyles(() =>
  createStyles({
    root: {},
    container: {
      // position: "relative", <- breaks layout
      position: 'unset'
    },
    placeHolder: {
      // position: "absolute" <- breaks layout
      position: 'unset'
    }
  })
);

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

  const classesRTE = useStylesRTE();
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
          classes={classesRTE}
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
