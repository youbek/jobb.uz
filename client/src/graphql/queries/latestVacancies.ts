import gql from "graphql-tag";
import { VACANCY_FRAGMENT } from "graphql/fragments";
import { IVacancy } from "types";

export interface IVacancySearchInput {
  cursor?: string;
  title?: string;
  category?: string;
  district?: string;
  partTime?: boolean;
  noExperience?: boolean;
  remote?: boolean;
}

export interface LATEST_VACANCIES_RESULT {
  latestVacancies: IVacancy[];
}

export interface LATEST_VACANCIES_VARS {
  options: IVacancySearchInput;
}

export const LATEST_VACANCIES = gql`
  query LatestVacancies($options: VacancySearchInput) {
    latestVacancies(options: $options) {
      ...vacancyFragment
    }
  }
  ${VACANCY_FRAGMENT}
`;
