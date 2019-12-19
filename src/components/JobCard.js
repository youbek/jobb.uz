import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import JobDescription from "./JobDescription";
import JobCardBadges from "./JobCardBadges";
import Moment from "react-moment";

import styled from "styled-components";

import "moment-timezone";

const JobCardViewCompanyName = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-top: 15px;
`;
const JobCardViewFooter = styled.div`
  display: flex;
`;
const JobCardViewAddress = styled.div`
  font-size: 14px;
  color: #757575;
  margin-top: 4px;
`;

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div>
        <div className="job-card-date">
          <Moment locale="ru" fromNow>
            {job.date}
          </Moment>
        </div>
        <div className="job-card-job-title">{job.title}</div>
      </div>
      <JobDescription description={job.description} />
      <JobCardBadges noExperience={job.noExperience} partTime={job.partTime} />
      <JobCardViewCompanyName>{job.companyName}</JobCardViewCompanyName>
      <JobCardViewFooter>
        <JobCardViewAddress>{job.address.name}</JobCardViewAddress>
      </JobCardViewFooter>
      <Link className="job-card-link" to={`/vacancy/${job.hashId}`}></Link>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    noExperience: PropTypes.bool.isRequired,
    partTime: PropTypes.bool.isRequired,
    address: PropTypes.shape({
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }).isRequired,
    hashId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default JobCard;
