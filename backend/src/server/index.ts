import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "graphql_api";

export function start() {
  try {
    if (!process.env.PORT) {
      throw new Error(`PORT is required in env variables`);
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const app = express();

    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      )
    );
  } catch (err) {
    throw new Error(
      `Error while starting apollo-express-server. \n\n\n ${err}`
    );
  }
}
