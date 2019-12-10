import React, { useStatate } from "react";
import JobCard from "./JobCard";
import JobsFeedEmpty from "./JobsFeedEmpty";

function JobsFeed({ jobs }) {
  return (
    <div className="jobs-feed">
      {// IF NO JOBS FOUND
      Array.isArray(jobs) && jobs.length === 0 && <JobsFeedEmpty />}

      {// ELSE
      jobs.map((job, index) => (
        <JobCard key={index} job={job}></JobCard>
      ))}
    </div>
  );
}

export default JobsFeed;
