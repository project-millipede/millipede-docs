import { RenderUtils } from '@app/render-utils';
import { useEffectRef } from '@huse/effect-ref';
import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { ContentState, Editor, EditorState } from 'draft-js';
import elementResizeDetectorMaker from 'element-resize-detector';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useWindupString } from 'windups';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formHelperText: {
      color: theme.palette.error.main
    }
  })
);

const longText = 'Hi @all, my name is Markus.';

const insertText = (text: string) => {
  const end = text.length;

  const editorState = EditorState.createWithContent(
    ContentState.createFromText(text)
  );

  const selection = editorState.getSelection();
  const selectionAtEnd = selection.merge({
    anchorOffset: end,
    focusOffset: end
  });

  return EditorState.forceSelection(editorState, selectionAtEnd);
};

const resizeDetector =
  RenderUtils.isBrowser() && elementResizeDetectorMaker({ strategy: 'scroll' });

interface CommentEditorProps {
  isComment: boolean;
  create?: (content: string) => void;
  timelineId?: string;
}

export const CommentEditor: FC<CommentEditorProps> = ({
  isComment = true,
  create,
  timelineId
}) => {
  const { t } = useTranslation();

  const title = t(
    `pages/pidp/use-case/recognition/index:${
      isComment ? 'comment_create' : 'content_create'
    }`
  );
  const postButtonTitle = t(
    `pages/pidp/use-case/recognition/index:${
      isComment ? 'comment_publish' : 'content_publish'
    }`
  );
  const contentEmpty = t('pages/pidp/use-case/recognition/index:content_empty');

  // const contentInput = t('pages/pidp/use-case/recognition/index:content_input');

  const [commentState, setCommentState] = useState(() =>
    EditorState.createEmpty()
  );

  const [commentError, setCommentError] = useState(false);

  const classes = useStyles();

  const [text] = useWindupString(longText);

  useEffect(() => {
    setCommentState(insertText(text));
    setCommentError(false);
  }, [text]);

  const handlePostComment = useCallback(() => {
    if (commentState.getCurrentContent().getPlainText().trim()) {
      create(commentState.getCurrentContent().getPlainText().trim());
    }
    setCommentError(true);
  }, [commentState]);

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const [, setSize] = useState({
    width: 0,
    height: 0
  });

  const observeResize = useCallback(element => {
    const listener = () => {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    };
    resizeDetector.listenTo(element, listener);

    return () => {
      resizeDetector.removeListener(element, listener);
    };
  }, []);

  const ref = useEffectRef(observeResize);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '16px'
      }}
      ref={ref}
    >
      <Typography variant='h4'>
        <strong>{title}</strong>
      </Typography>

      <Editor
        ref={editorRef}
        editorState={commentState}
        onChange={data => {
          setCommentError(false);
          setCommentState(data);
        }}
        placeholder='Write something!'
      />

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
        id={`timeline-${timelineId}-content-post`}
      >
        {postButtonTitle}
      </Button>
    </div>
  );
};
