import { gql } from "apollo-server-express";
import { merge } from "lodash";
import { JobTypeDefs, JobResolvers } from "./job";

export const root = gql`
  type Query {
    tentak: String
  }
`;

export const typeDefs = [root, JobTypeDefs];

export const resolvers = merge(JobResolvers);
