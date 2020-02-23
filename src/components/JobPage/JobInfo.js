import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "moment-timezone";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";

import { Col, JobCardBadges, JobApplication } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import renderSalary from "../../helpers/renderSalary";

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

const JobDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;

function JobInfo({ job }) {
  const isHH = job.link.indexOf("hh.uz") !== -1;

  console.log(job);

  return (
    <Col col8>
      <JobTitle>{job.title}</JobTitle>
      <JobSalary>
        {renderSalary(job.salaryFrom, job.salaryTo, job.salaryCurrency)}
      </JobSalary>

      <JobCardBadges
        partTime={job.partTime}
        noExperience={job.noExperience}
        teen={job.teen}
        accessible={job.accessible}
      />
      <JobDescription>{ReactHtmlParser(job.description)}</JobDescription>
      <JobDate className="text-muted">
        <FontAwesomeIcon icon={faClock} color="#6c757d" className="mr-2" />
        <Moment locale="ru" fromNow className="text-muted mr-1">
          {new Date(job.date)}
        </Moment>
        {isHH ? "с HeadHunter" : "с Rabota.uz"}
      </JobDate>
      <JobApplication job={job} />
    </Col>
  );
}

JobInfo.propTypes = {
  job: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default JobInfo;
