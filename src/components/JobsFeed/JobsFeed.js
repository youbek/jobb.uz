import React from "react";
import PropTypes from "prop-types";

import Spinner from "../Spinner/Spinner";
import JobCard from "./JobCard/JobCard";
import JobsFeedEmpty from "./JobsFeedEmpty";

function JobsFeed({ jobs, loading }) {
  return (
    <div>
      {// IF NO JOBS FOUND
      Array.isArray(jobs) && jobs.length === 0 && <JobsFeedEmpty />}
      {// ELSE
      Array.isArray(jobs) &&
        jobs.length > 0 &&
        jobs.map((job, index) => <JobCard key={index} job={job}></JobCard>)}

      {loading && jobs.length !== 0 && (
        <Spinner size="12" color="#f64f64" className="mr-2" />
      )}
    </div>
  );
}

JobsFeed.propTypes = {
  jobs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default JobsFeed;
