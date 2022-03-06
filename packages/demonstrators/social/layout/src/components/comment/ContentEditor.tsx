import SendIcon from '@mui/icons-material/Send';
import { Button, Typography } from '@mui/material';
import { useWindupString } from '@project-millipede/windups';
import { ContentState, Editor, EditorState } from 'draft-js';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

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

interface ContentEditorProps {
  isComment: boolean;
  create?: (content: string) => void;
  timelineId?: string;
}

export const ContentEditor: FC<ContentEditorProps> = ({
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

  const [commentState, setCommentState] = useState(() =>
    EditorState.createEmpty()
  );

  const [commentError, setCommentError] = useState(false);

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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '8px'
      }}
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
        // Introduces a content shift of the entire app
        // placeholder='Write something!'
      />

      {commentError && <Typography>{contentEmpty}</Typography>}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '8px'
        }}
      >
        <Button
          id={`timeline-${timelineId}-content-post`}
          variant='text'
          color='primary'
          startIcon={<SendIcon />}
          onClick={handlePostComment}
          style={{
            textTransform: 'none'
          }}
        >
          {postButtonTitle}
        </Button>
      </div>
    </div>
  );
};
