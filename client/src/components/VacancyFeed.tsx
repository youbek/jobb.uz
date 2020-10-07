import React from "react";

import { Waypoint } from "react-waypoint";

// import Spinner from "../Spinner/Spinner";
// import JobCard from "./JobCard/JobCard";
// import JobsEmpty from "./JobsEmpty";

import { IVacancy } from "types";
import Alert from "./Alert";

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
  if (!vacancies.length) {
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
    <React.Fragment>
      {Array.isArray(jobs) &&
        jobs.length > 0 &&
        jobs.map((job, index) => (
          <React.Fragment key={index}>
            <JobCard job={job}></JobCard>
            {index === jobs.length - 1 && (
              <Waypoint onEnter={() => setRefetching(true)}></Waypoint>
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}

export default VacancyFeed;
