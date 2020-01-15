const { ApolloServer } = require("apollo-server-express");

const graphQLModules = require("./graphql");
const { checkJWT } = require("./helpers");

function createApolloServer() {
  const apolloServer = new ApolloServer({
    playground: true,
    cors: true,
    introspection: true,
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
  });

  return apolloServer;
}

module.exports = {
  createApolloServer,
};
