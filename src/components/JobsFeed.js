import React from "react";
import PropTypes from "prop-types";

import { Spinner } from "reactstrap";
import JobCard from "./JobCard";
import JobsFeedEmpty from "./JobsFeedEmpty";

function JobsFeed({ jobs, loading }) {
  return (
    <div className="jobs-feed">
      {// IF NO JOBS FOUND
      Array.isArray(jobs) && jobs.length === 0 && <JobsFeedEmpty />}

      {// ELSE
      jobs.map((job, index) => (
        <JobCard key={index} job={job}></JobCard>
      ))}
      <div className="load-more-results mt-4">
        {loading && jobs.length !== 0 && (
          <Spinner className="spinner-center" color="primary" size="sm" />
        )}
      </div>
    </div>
  );
}

JobsFeed.propTypes = {
  jobs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default JobsFeed;
