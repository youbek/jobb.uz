const app = require("express")();
const { ApolloServer } = require("apollo-server-express");

const graphQLModules = require("./graphql");

const { checkJWT } = require("./helpers");

const db = require("./db");

const socketIO = require("./socket.io");

db.connect()
  .then(() => {
    const apolloServer = new ApolloServer({
      modules: graphQLModules,
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        if (!token) {
          return {
            loggedIn: false,
          };
        }

        try {
          const decodedUser = await checkJWT(token);
          return {
            loggedIn: true,
            user: decodedUser,
          };
        } catch (err) {
          console.error(err);
          return {
            loggedIn: false,
          };
        }
      },
      cors: true,
    });

    apolloServer.applyMiddleware({ app, path: "/" });
    const server = socketIO.initialize(app);

    server.listen(8080, err => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Server started on port 8080");
    });
  })
  .catch(err => {
    console.log(err);
  });
