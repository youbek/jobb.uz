import path from "path";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "graphql_api";

const clientFolder = path.join(__dirname + "../../../../client/build");

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

    app.use(express.static(clientFolder));

    server.applyMiddleware({ app });

    app.get("*", (req, res) => {
      res.sendFile(`${clientFolder}/index.html`);
    });

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
