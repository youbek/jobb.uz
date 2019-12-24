import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../Buttons/Button";

const JobCardDescription = styled.div`
  margin-top: 10px;
  line-height: 1.5;
  font-size: 1rem;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const ShowMore = styled(Button)`
  position: relative;
  background-color: #fff;
  padding: 0;
  color: #f64f64;
  z-index: 100;
  font-weight: 400;
  &:hover {
    background-color: #fff;
    color: #f64f64;
  }
`;

function JobDescription({ description }) {
  const [expand, setExpand] = useState(false);
  const shortForm =
    description.length > 101 ? description.slice(0, 300) + "..." : description;

  function handleExpandButton(event) {
    event.stopPropagation();
    setExpand(true);
  }

  return (
    <JobCardDescription>
      <p className="mb-0">{expand ? description : shortForm}</p>
      {!expand && (
        <ShowMore onClick={handleExpandButton}>
          Show More <strong>↓</strong>
        </ShowMore>
      )}
    </JobCardDescription>
  );
}

JobDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default JobDescription;
