const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    job(hashId: String!): Job
    getLatestJobs(
      cursor: ID
      limit: Int!
      categoryName: String
      subCategoryName: String
    ): [Job]
    jobCategories: [JobCategory]
    getPopularJobTitles(categoryName: String): [PopularJobTitle]
    searchJob(keyword: String!): [String]!
    similarJobsPay(title: String!): [String]!
  }

  extend type Mutation {
    postJob(
      title: String!
      address: JobAddressInput!
      companyName: String!
      contactPhone: String
      description: String!
      noExperience: Boolean!
      salaryFrom: Int!
      salaryTo: Int!
      partTime: Boolean!
    ): Job!
  }

  type Job {
    _id: ID!
    hashId: ID!
    title: String!
    category: String!
    state: String
    address: JobAddress!
    companyName: String!
    contactPhone: String
    description: String!
    noExperience: Boolean!
    salaryFrom: Int!
    salaryTo: Int!
    partTime: Boolean!
    date: String!
    author: JobAuthor!
    authorId: String!
  }

  type JobAuthor {
    firstName: String!
    lastName: String!
    hashId: String!
  }

  type JobCategory {
    name: String!
    subCategories: [String]
  }

  type JobAddress {
    name: String!
    lat: Float!
    long: Float!
  }

  type PopularJobTitle {
    name: String!
    amount: Int!
  }

  input JobAddressInput {
    name: String!
    lat: Float!
    long: Float!
  }
`;
