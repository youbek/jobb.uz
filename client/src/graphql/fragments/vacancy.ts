import gql from "graphql-tag";

export const VACANCY_FRAGMENT = gql`
  fragment vacancyFragment on Vacancy {
    _id
    hashId
    title
    address {
      name
      lat
      long
      district
    }
    companyName
    description
    contactPhone
    salary
    noExperience
    partTime
    remote
  }
`;
