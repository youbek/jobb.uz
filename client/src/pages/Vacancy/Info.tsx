import React from "react";
import styled from "styled-components";
import "styled-components/macro";
import ReactHtmlParser from "react-html-parser";

import { Col, Badge, Button } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-solid-svg-icons";

import { IVacancy } from "types";

// STYLED COMPONENTS
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.5rem;
  margin-top: 0;
  color: #383c43;
`;

const Salary = styled.span`
  font-weight: 600;
  color: #383c43;
`;

const Description = styled.p`
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

const Source = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  color: #6c757d;
`;

const VacancyBadges = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  vacancy: IVacancy;
}

function Info({ vacancy }: Props) {
  const {
    title,
    description,
    link,
    sourceText,
    formattedSalary,
    expired,
    partTime,
    noExperience,
    remote,
  } = vacancy;

  return (
    <Col size="col8">
      <Title>{title}</Title>
      <Salary>{formattedSalary}</Salary>
      <VacancyBadges>
        {partTime && <Badge color="green">Неполный день</Badge>}
        {noExperience && <Badge color="blue">Без опыта</Badge>}
        {remote && <Badge color="blue">Удаленная работа</Badge>}
      </VacancyBadges>
      <Description>{ReactHtmlParser(description)}</Description>
      <Source>
        <FontAwesomeIcon
          icon={faClock}
          color="#6c757d"
          css="margin-right: 0.5rem"
        />
        {sourceText}
      </Source>
      {!expired ? (
        <Button as="a" href={link} target="_blank">
          Откликнуться
        </Button>
      ) : (
        <Button disabled>Вакансия недоступна</Button>
      )}
    </Col>
  );
}

export default Info;
