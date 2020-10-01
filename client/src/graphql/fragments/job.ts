import gql from "graphql-tag";

export const JOB_FRAGMENT = gql`
  fragment jobFragment on Job {
    _id
    title
    date
    description
    address {
      name
      lat
      long
    }
    noExperience
    hashId
    companyName
    noExperience
    salaryFrom
    salaryTo
    partTime
  }
`;
