import React from "react";
import { Waypoint } from "react-waypoint";
import styled from "styled-components";

import { Spinner, VacancyCard, Alert } from "components";

import { IVacancy } from "types";

const Wrapper = styled.div`
  padding-bottom: 50px;
`;

interface Props {
  vacancies: IVacancy[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  searchText?: string;
}

function VacancyFeed({
  vacancies,
  isLoading,
  onLoadMore = () => {},
  searchText,
}: Props) {
  if (!isLoading && !vacancies.length) {
    if (searchText) {
      return (
        <Alert>
          Вакансии по запросу {searchText} не найдены. Попробуйте другие
          варианты поискового запроса или сбросьте фильтр
        </Alert>
      );
    }

    return (
      <Alert>
        Вакансии не найдены. Попробуйте поискового запроса или фильтра
      </Alert>
    );
  }

  return (
    <Wrapper>
      {searchText && (
        <div css="margin-bottom: 0.5rem">
          {`Вакансии по запросу "${searchText}"`}
        </div>
      )}

      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy._id} vacancy={vacancy} />
      ))}
      {/* SPINNER MOVED BOTTOM BECAUSE ON LOADMORE IT SHOULD BE AT  THE BOTTOM LEAVING ALL FETCHED VACANCIES AT THE TOP */}
      {isLoading && <Spinner />}
      <Waypoint onEnter={onLoadMore} />
    </Wrapper>
  );
}

export default VacancyFeed;
