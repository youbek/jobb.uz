import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useWindowDimensions } from "hooks";

import { Badge } from "components";

import { IVacancy } from "types";
import Description from "./Description";

const VacancyTitle = styled.div`
  font-size: 20px;
  margin-top: 5px;
  font-weight: 700;
  line-height: 1.5;
  color: #383c43;
`;

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  color: #272626;
  cursor: pointer;
  position: relative;
  border: 1px solid #e0dfde;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease-in-out;

  &:hover ${VacancyTitle} {
    color: #000;
  }

  &:hover {
    box-shadow: 0 0 0 1px rgba(56, 60, 67, 0.07),
      0 0px 0px 0 rgba(56, 60, 67, 0.15);
  }
`;

const VacancyDate = styled.div`
  font-size: 14px;
  color: #757575;
`;

const VacancySalary = styled.div`
  font-weight: 700;
  color: #f64f64;
`;

const VacancyCompanyName = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-top: 15px;
`;

const VacancyAddress = styled.div`
  font-size: 14px;
  color: #757575;
  margin-top: 4px;
`;

const VacancyBadges = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
`;

const VacancyLink = styled(Link)`
  bottom: 0px;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: block;
  z-index: 1;
`;

interface Props {
  vacancy: IVacancy;
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
    formattedSalary,
  } = vacancy;
  const { isMobile } = useWindowDimensions();
  const vacancyLink = `/vacancy/${hashId}`;

  return (
    <Wrapper
      as={Link}
      to={vacancyLink}
      href={vacancyLink}
      target={!isMobile ? "_blank" : ""}
    >
      <VacancyDate>{/* {date here} */}</VacancyDate>
      <VacancyTitle>{title}</VacancyTitle>
      <VacancySalary>{formattedSalary}</VacancySalary>
      <Description description={description} />
      <VacancyBadges>
        {partTime && <Badge color="green">Неполный день</Badge>}
        {noExperience && <Badge color="blue">Без опыта</Badge>}
      </VacancyBadges>

      <VacancyCompanyName>{companyName}</VacancyCompanyName>
      <VacancyAddress>{address.name}</VacancyAddress>
    </Wrapper>
  );
}

export default VacancyCard;
