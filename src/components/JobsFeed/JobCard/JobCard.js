import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";

import { JobDescription, JobCardBadges } from "components";

import { formatCityName, renderSalary } from "helpers";

const JobCardJobTitle = styled.div`
  font-size: 20px;
  margin-top: 5px;
  font-weight: 700;
  line-height: 1.5;
  color: #383c43;
`;

const JobCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  border: 1px solid #e0dfde;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease-in-out;

  &:hover ${JobCardJobTitle} {
    color: #f64f64;
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(56, 60, 67, 0.07),
      0 0px 0px 0 rgba(56, 60, 67, 0.15);
    transition: box-shadow 0.25s ease-out;
  }
`;

const JobCardDate = styled.div`
  font-size: 14px;
  color: #757575;
`;

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
const JobCardLink = styled(Link)`
  bottom: 0px;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: block;
  z-index: 1;
`;

const JobCard = ({ job }) => {
  return (
    <JobCardWrapper>
      <div>
        <JobCardDate>
          <Moment locale="ru" fromNow>
            {new Date(job.date)}
          </Moment>
        </JobCardDate>
        <JobCardJobTitle>{job.title}</JobCardJobTitle>

        {renderSalary(job.salaryFrom, job.salaryTo)}
      </div>
      <JobDescription description={job.description} />
      <JobCardBadges noExperience={job.noExperience} partTime={job.partTime} />
      <JobCardViewCompanyName>{job.companyName}</JobCardViewCompanyName>
      <JobCardViewFooter>
        <JobCardViewAddress>
          {formatCityName(job.address.name)}
        </JobCardViewAddress>
      </JobCardViewFooter>
      <JobCardLink to={`/vacancy/${job.hashId}`} />
    </JobCardWrapper>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    salaryFrom: PropTypes.string,
    salaryTo: PropTypes.string,
    noExperience: PropTypes.bool.isRequired,
    partTime: PropTypes.bool.isRequired,
    address: PropTypes.shape({
      name: PropTypes.string,
      lat: PropTypes.number,
      long: PropTypes.number,
    }).isRequired,
    hashId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default JobCard;
