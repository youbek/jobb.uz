import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";

import { JobDescription, JobCardBadges } from "components";

import { formatCityName, renderSalary } from "helpers";
import { useWindowDimensions } from "hooks";

import { Vacancy } from "types";

const VacancyCard__Title = styled.div`
  font-size: 20px;
  margin-top: 5px;
  font-weight: 700;
  line-height: 1.5;
  color: #383c43;
`;

const VacancyCard__Container = styled.a`
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

  &:hover ${VacancyCard__Title} {
    color: ;
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(56, 60, 67, 0.07),
      0 0px 0px 0 rgba(56, 60, 67, 0.15);
  }
`;

const VacancyCard__Date = styled.div`
  font-size: 14px;
  color: #757575;
`;

const VacancyCard__Salary = styled.div`
  font-weight: 700;
  color: #f64f64;
`;

const VacancyCard__CompanyName = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-top: 15px;
`;

const VacancyCard__Address = styled.div`
  font-size: 14px;
  color: #757575;
  margin-top: 4px;
`;

const VacancyCard__Link = styled(Link)`
  bottom: 0px;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: block;
  z-index: 1;
`;

interface Props {
  vacancy: Vacancy;
}

function VacancyCard({ vacancy }: Props) {
  const {
    hashId,
    date,
    title,
    address,
    description,
    noExperience,
    companyName,
    partTime,
    salary,
  } = vacancy;

  const isMobile = useWindowDimensions();
  const vacancyLink = `/vacancy/${hashId}`;

  return (
    <VacancyCard__Container href={vacancyLink} target="_blank">
      <VacancyCard__Date>
        <Moment locale="ru" fromNow>
          {new Date(date)}
        </Moment>
      </VacancyCard__Date>
      <VacancyCard__Title>{title}</VacancyCard__Title>
      <VacancyCard__Salary>{salary}</VacancyCard__Salary>
      <JobDescription description={description} />
      <JobCardBadges noExperience={noExperience} partTime={partTime} />
      <VacancyCard__CompanyName>{companyName}</VacancyCard__CompanyName>
      <VacancyCard__Address>{formatCityName(address)}</VacancyCard__Address>
      <VacancyCard__Link
        to={vacancyLink}
        target={isMobile ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
      />
    </VacancyCard__Container>
  );
}

export default VacancyCard;
