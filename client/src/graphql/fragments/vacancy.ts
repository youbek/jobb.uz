import gql from "graphql-tag";

export const VACANCY_FRAGMENT = gql`
  fragment vacancyFragment on Vacancy {
    _id
    hashId
    title
    address {
      name
      lat
      lng
      district
    }
    companyName
    description
    contactPhone
    formattedSalary
    noExperience
    partTime
    remote
  }
`;
