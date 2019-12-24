import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "moment-timezone";
import Moment from "react-moment";

import JobCardBadges from "../JobsFeed/JobCard/JobCardBadges";
import JobApplication from "./JobApplication";
import Col8 from "../Layout/Col8";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// STYLED COMPONENTS

const JobTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.5rem;
  margin-top: 0;
  color: #383c43;
`;

const JobSalary = styled.span`
  font-weight: 600;
  color: #383c43;
`;

const JobDescription = styled.p`
  margin-top: 1.5rem;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const JobDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;

function JobInfo({ job }) {
  const date = new Date(Number(job.date)).toString();
  return (
    <Col8>
      <JobTitle>{`${job.title} at 
        ${job.companyName} `}</JobTitle>
      <JobSalary className="job-page-salary">{`Salary  
        $${job.salaryFrom} - $${job.salaryTo} /hour`}</JobSalary>

      <JobCardBadges
        partTime={job.partTime}
        noExperience={job.noExperience}
        teen={job.teen}
        accessible={job.accessible}
      />
      <JobDescription>{job.description}</JobDescription>
      <JobDate>
        <FontAwesomeIcon icon={faClock} color="#6c757d" className="mr-2" />
        <Moment fromNow className="text-muted">
          {new Date(date)}
        </Moment>
      </JobDate>
      <JobApplication job={job} />
    </Col8>
  );
}

JobInfo.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default JobInfo;
