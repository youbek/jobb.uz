import gql from "graphql-tag";
import { VACANCY_FRAGMENT } from "graphql/fragments";
import { IVacancy } from "types";

export interface IVacancySearchArgs {
  cursor?: string;
  title?: string;
  category?: string;
  district?: string;
  partTime?: boolean;
  noExperience?: boolean;
  remote?: boolean;
}

export interface LATEST_JOBS_RESULT {
  latestVacancies: IVacancy[];
}

export interface LATEST_JOBS_VARS {
  options: IVacancySearchArgs;
}

export const LATEST_VACANCIES = gql`
  query LatestVacancies($options: VacancySearchArgs) {
    latestVacancies(options: $options) {
      ...vacancyFragment
    }
  }
  ${VACANCY_FRAGMENT}
`;
