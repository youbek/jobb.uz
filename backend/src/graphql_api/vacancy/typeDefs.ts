import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    vacancy(hashId: String!): Vacancy
    latestVacancy(options: VacancySearchInput!): [Vacancy]!
  }

  type Vacancy {
    _id: ID!
    hashId: ID!
    title: String!
    category: String!
    address: JobAddress!
    companyName: String!
    description: String!
    date: Float!
    link: String!
    similarVacancies: [Job]!
    contactPhone: String
    salary: String
    noExperience: Boolean
    partTime: Boolean
    remote: Boolean
  }

  type VacancyAddress {
    name: String
    lat: Float
    long: Float
    district: String
  }

  input VacancySearchInput {
    cursor: ID
    title: String
    category: String
    district: String
    partTime: Boolean
    noExperience: Boolean
    remote: Boolean
  }
`;
