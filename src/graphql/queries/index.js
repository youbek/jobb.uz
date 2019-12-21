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

export const JOB_CATEGORIES = gql`
  query JobCategories {
    jobCategories {
      name
      subCategories
    }
  }
`;

export const GET_LATEST_JOBS = gql`
  query GetLatestJobs(
    $cursor: ID
    $limit: Int!
    $categoryName: String
    $subCategoryName: String
  ) {
    getLatestJobs(
      cursor: $cursor
      limit: $limit
      categoryName: $categoryName
      subCategoryName: $subCategoryName
    ) {
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
    }
  }
`;

export const GET_POPULAR_JOB_TITLES = gql`
  query GetPopularJobTitles($categoryName: String) {
    getPopularJobTitles(categoryName: $categoryName) {
      name
      amount
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
      author {
        firstName
        lastName
        hashId
      }
      date
      category
    }
  }
`;
