import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    job(hashId: String!): Job
    latestJobs(options: JobSearchInput!): [Job]!
  }

  type Job {
    _id: ID!
    hashId: ID!
    title: String!
    category: String!
    address: JobAddress!
    companyName: String!
    description: String!
    date: Float!
    link: String!
    similarJobs: [Job]!
    contactPhone: String
    state: String
    noExperience: Boolean
    salaryFrom: Float
    salaryTo: Float
    salaryCurrency: String
    partTime: Boolean
  }

  type JobAddress {
    name: String
    lat: Float
    long: Float
    district: String
  }

  input JobSearchInput {
    cursor: ID
    title: String
    category: String
    district: String
    partTime: Boolean
    noExperience: Boolean
  }
`;
