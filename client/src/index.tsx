import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  concat,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import "moment/locale/ru";

// don't remove it or don't change import
import * as types from "styled-components/cssprop";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

function Root() {
  const httpLink = new HttpLink({
    uri: window.location.origin.includes("localhost")
      ? "http://localhost:8080/graphql"
      : `${window.location.origin}/graphql`,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(errorLink, httpLink),
  });

  return <ApolloProvider client={client}>{<App />}</ApolloProvider>;
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
