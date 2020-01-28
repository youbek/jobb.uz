const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./db");
const { createApolloServer } = require("./apolloServer");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use(cookieParser());

console.log(process.env.DB_URL);

db.connect(process.env.DB_URL)
  .then(() => {
    const apolloServer = createApolloServer();

    apolloServer.applyMiddleware({ app, path: "/graphql" });

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });

    app.listen(port, err => {
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
