import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../Buttons/Button";
import ReactHtmlParser from "react-html-parser";

const JobCardDescription = styled.div`
  margin-top: 10px;
  line-height: 1.5;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1rem;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 2px;
  }
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
      <p className="mb-0">
        {expand ? ReactHtmlParser(description) : ReactHtmlParser(shortForm)}
      </p>
      {!expand && (
        <ShowMore onClick={handleExpandButton}>
          <strong>Подробнее ↓</strong>
        </ShowMore>
      )}
    </JobCardDescription>
  );
}

JobDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default JobDescription;
