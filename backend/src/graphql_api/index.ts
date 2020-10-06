import { gql } from "apollo-server-express";
import { merge } from "lodash";
import { VacancyTypeDefs, VacancyResolvers } from "./vacancy";

export const root = gql`
  type Query {
    tentak: String
  }
`;

export const typeDefs = [root, VacancyTypeDefs];

export const resolvers = merge(VacancyResolvers);
