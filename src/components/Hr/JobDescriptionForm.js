import React, { useState, useEffect, useRef } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";

function JobDescriptionForm({ error, job, postJobStatus, handleDescription }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  function focusEditor() {
    editor.current.focus();
  }
  useEffect(() => {
    focusEditor();
  }, []);

  useEffect(() => {
    const descriptionJson = convertToRaw(editorState.getCurrentContent());
    handleDescription(descriptionJson);
  }, [editorState]);

  function onChange(editorState) {
    setEditorState(editorState);
  }

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  function onUnderlineClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  }

  function onBoldClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }

  function onItalicClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  }

  return (
    <div className="editor-container">
      <div className="editor-controls">
        <span onClick={onUnderlineClick}>Underline</span>
        <span onClick={onBoldClick}>Bold</span>
        <span onClick={onItalicClick}>Italic</span>
      </div>
      <div className="editor" onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Write job description"
          readOnly={postJobStatus.loading}
          value={job.description}
          invalid={error.type === "description"}
        />
      </div>
    </div>
  );
}

export default JobDescriptionForm;
