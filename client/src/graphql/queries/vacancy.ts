import gql from "graphql-tag";
import { VACANCY_FRAGMENT } from "graphql/fragments";
import { IVacancy } from "types";

export interface VACANCY_RESULT {
  vacancy: IVacancy;
}

export interface VACANCY_VARS {
  hashId: string;
}

export const VACANCY = gql`
  query Vacancy($hashId: String!) {
    vacancy(hashId: $hashId) {
      ...vacancyFragment
      expired
      link
      category
      sourceText
      similarVacancies {
        ...vacancyFragment
      }
    }
  }
  ${VACANCY_FRAGMENT}
`;
