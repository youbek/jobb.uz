import React from "react";
import "moment-timezone";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { Editor, EditorState, convertFromRaw } from "draft-js";

import JobCardBadges from "./JobCardBadges";
import JobApplication from "./JobApplication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function JobInfo({ job, user }) {
  const description = JSON.parse(job.description);
  const contentState = convertFromRaw(description);
  const editorState = EditorState.createWithContent(contentState);

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
        <Editor className="mt-4" editorState={editorState} readOnly={true} />
      </div>
      <div className="date-and-view">
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
