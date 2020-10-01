import gql from "graphql-tag";
import { JOB_FRAGMENT } from "../fragments";

export interface JOB_RESULT {}

export interface JOB_VARS {}

export const JOB = gql`
  query Job($hashId: String!) {
    job(hashId: $hashId) {
      ...jobFragment
      date
      category
      link
      salaryCurrency
      similarJobs {
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
    }
  }
  ${JOB_FRAGMENT}
`;
