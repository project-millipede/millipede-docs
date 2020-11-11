import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { ContentState, Editor, EditorState } from 'draft-js';
import useTranslation from 'next-translate/useTranslation';
import React, { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useRef, useState } from 'react';

// import { useWindupString } from 'windups';

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
  timelineId?: string;
}

export interface EditorHandles {
  setRawText: (value: string) => void;
  handlePostComment: () => void;
}

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

const CommentEditor: ForwardRefRenderFunction<
  HTMLDivElement,
  CommentEditorProps
> = ({ isComment = true, create, timelineId }, ref) => {
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

  // const [text, setText] = useTypeWriter('');

  // const [rawText] = useState(longText);

  // useEffect(() => {
  //   setText(rawText);
  // }, [rawText]);

  // const [text] = useWindupString(longText);
  const [text] = useState(longText);

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

  // const classes = useStyles();

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

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

export default forwardRef(CommentEditor);
