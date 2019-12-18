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
  }

  extend type Mutation {
    postJob(
      title: String!
      address: String!
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
    address: String!
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
`;
