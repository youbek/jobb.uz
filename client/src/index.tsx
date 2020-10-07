import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "moment/locale/ru";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

import "./styles/main.scss";

function Root() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: window.location.origin.includes("localhost")
      ? "http://localhost:8080/graphql"
      : "http://www.jobb.uz/graphql",
  });

  return <ApolloProvider client={client}>{/* <App /> */}</ApolloProvider>;
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
