const { ApolloServer } = require("apollo-server-express");

const graphQLModules = require("./graphql");
const { checkJWT } = require("./helpers");

function createApolloServer() {
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

  return apolloServer;
}

module.exports = {
  createApolloServer,
};
