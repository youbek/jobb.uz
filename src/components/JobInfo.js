import React from "react";
import "moment-timezone";
import Moment from "react-moment";
import PropTypes from "prop-types";

import JobCardBadges from "./JobCardBadges";
import JobApplication from "./JobApplication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function JobInfo({ job, user }) {
  return (
    <div>
      <h1 className="job-page-job-title">{`${job.title} at 
        ${job.companyName} `}</h1>
      <span className="job-page-salary">{`Average salary from 
        $${job.salaryFrom} to $${job.salaryTo}`}</span>

      <JobCardBadges
        partTime={job.partTime}
        noExperience={job.noExperience}
        teen={job.teen}
        accessible={job.accessible}
      />
      <div className="job-description">
        <p className="mt-4">{job.description}</p>
      </div>
      <div className="date-and-view mt-2">
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        <Moment fromNow className="text-muted">
          {job.date}
        </Moment>
      </div>
      <JobApplication job={job} user={user} />
    </div>
  );
}

JobInfo.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default JobInfo;
