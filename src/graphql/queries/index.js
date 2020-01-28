import gql from "graphql-tag";

export const CHECK_TOKEN = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token) {
      firstName
      lastName
      hashId
      email
      isHr
    }
  }
`;

export const GET_LATEST_JOBS = gql`
  query GetLatestJobs($options: JobSearchArgs) {
    getLatestJobs(options: $options) {
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
`;

export const GET_JOB = gql`
  query getJob($hashId: String!) {
    job(hashId: $hashId) {
      hashId
      title
      state
      address {
        name
        lat
        long
      }
      companyName
      contactPhone
      description
      noExperience
      salaryFrom
      salaryTo
      partTime
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
`;
