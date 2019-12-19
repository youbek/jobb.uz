const app = require("express")();

const db = require("./db");
const socketIO = require("./socket.io");
const { createApolloServer } = require("./apolloServer");

db.connect(process.env.DB_URL)
  .then(() => {
    const apolloServer = createApolloServer();

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
