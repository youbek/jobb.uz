import React, { useState } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";

function JobDescription({ job }) {
  const description = JSON.parse(job.description);
  const contentState = convertFromRaw(description);
  const editorState = EditorState.createWithContent(contentState);
  const [expand, setExpand] = useState(false);

  console.log(description.blocks[0].text);

  function renderDescription() {
    if (description.blocks[0].text.length > 101) {
      const shortDescription = contentState.slice(0, 300) + "...";
      console.log(shortDescription);
      return shortDescription;
    }
  }

  function handleExpandButton(event) {
    event.stopPropagation();
    setExpand(true);
  }

  function renderExpandButton() {
    return (
      <button
        className="btn btn-expand-description"
        onClick={handleExpandButton}
      >
        Show More
      </button>
    );
  }

  return (
    <div className="job-card-job-description">
      {expand ? (
        <Editor
          className="job-description"
          editorState={editorState}
          readOnly={true}
        />
      ) : (
        <React.Fragment>
          <p className="job-description">{renderDescription()}</p>
          {renderExpandButton()}
        </React.Fragment>
      )}
    </div>
  );
}

export default JobDescription;
