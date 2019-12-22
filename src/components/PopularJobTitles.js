import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import capitalize from "lodash/capitalize";

function PopularJobTitles({ popularProfessions, currentUrl }) {
  return (
    <div className="popular-job-titles mb-4">
      <div className="popular-jobs-title h6">Popular Job Titles</div>
      <div className="popular-job-titles-container mt-3">
        {popularProfessions.map(profession => (
          <Button
            outline
            className="popular-job-title-btn mr-2 mb-2"
            key={profession.id}
            tag={Link}
            to={`${currentUrl}/${profession.title}`}
          >
            {capitalize(profession.name)}
          </Button>
        ))}
      </div>
    </div>
  );
}

PopularJobTitles.propTypes = {
  popularProfessions: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUrl: PropTypes.string.isRequired,
};

export default PopularJobTitles;
