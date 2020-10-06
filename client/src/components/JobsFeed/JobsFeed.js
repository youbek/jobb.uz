import React from "react";
import PropTypes from "prop-types";
import { Waypoint } from "react-waypoint";

import Spinner from "../Spinner/Spinner";
import JobCard from "./JobCard/JobCard";
import JobsEmpty from "./JobsEmpty";

function JobsFeed({ jobs, loading, setRefetching, searchTitle }) {
  return (
    <React.Fragment>
      {
        // IF NO JOBS FOUND
        Array.isArray(jobs) && jobs.length === 0 && (
          <JobsEmpty searchTitle={searchTitle} />
        )
      }
      {Array.isArray(jobs) &&
        jobs.length > 0 &&
        jobs.map((job, index) => (
          <React.Fragment key={index}>
            <JobCard job={job}></JobCard>
            {index === jobs.length - 1 && (
              <Waypoint onEnter={() => setRefetching(true)}></Waypoint>
            )}
          </React.Fragment>
        ))}

      {loading && jobs.length !== 0 && (
        <Spinner size="12" color="#f64f64" className="mr-2" />
      )}
    </React.Fragment>
  );
}

JobsFeed.propTypes = {
  jobs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchMoreJobs: PropTypes.func.isRequired,
};

export default JobsFeed;
