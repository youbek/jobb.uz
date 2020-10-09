import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    vacancy(hashId: String!): Vacancy
    latestVacancies(options: VacancySearchInput): [Vacancy]!
  }

  type Vacancy {
    _id: ID!
    hashId: ID!
    title: String!
    category: String!
    address: VacancyAddress!
    companyName: String!
    description: String!
    date: Float!
    link: String!
    similarVacancies: [Vacancy]!
    sourceText: String!
    expired: Boolean!
    formattedSalary: String!
    contactPhone: String
    noExperience: Boolean
    partTime: Boolean
    remote: Boolean
  }

  type VacancyAddress {
    name: String
    lat: Float
    lng: Float
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
