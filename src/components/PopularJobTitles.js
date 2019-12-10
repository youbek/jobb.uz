import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import capitalize from 'lodash/capitalize';
import _ from 'lodash';

function PopularJobTitles({ categoryName, popularProfessions, currentUrl }) {
  return (
    <div className="popular-job-titles mb-4">
      <div className="popular-jobs-title h6">
        Popular {_.startCase(_.toLower(categoryName))} Job Titles
      </div>
      <div className="popular-job-titles-container mt-3">
        {popularProfessions.map(profession => (
          <Button
            outline
            className="mr-2"
            key={profession.id}
            tag={Link}
            to={`${currentUrl}/${profession.title}`}
          >
            {capitalize(profession.title)}
          </Button>
        ))}
      </div>
    </div>
  );
}

PopularJobTitles.defaultProps = {
  currentUrl: '',
};

export default PopularJobTitles;
