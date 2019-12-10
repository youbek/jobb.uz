import React, { useState } from "react";
import PropTypes from "prop-types";

function JobDescription({ description }) {
  const [expand, setExpand] = useState(false);
  const shortForm =
    description.length > 101 ? description.slice(0, 300) : description;

  function handleExpandButton(event) {
    event.stopPropagation();
    setExpand(true);
  }

  return (
    <div className="job-card-job-description">
      <p className="job-description">{expand ? description : shortForm}</p>
      {!expand && (
        <button
          className="btn btn-expand-description"
          onClick={handleExpandButton}
        >
          Show More
        </button>
      )}
    </div>
  );
}

JobDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default JobDescription;
