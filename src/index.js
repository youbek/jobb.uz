import React, { useRef } from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./app/App";

import AuthContextProvider from "./context/AuthContext";
import SocketContextProvider from "./context/SocketContext";

import * as serviceWorker from "./serviceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.scss";

function Root() {
  const authContext = useRef();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:8080/",
    request: operation => {
      const token = localStorage.getItem("userToken");
      operation.setContext({
        headers: {
          authorization: token ? token : "",
        },
      });
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        for (let error of graphQLErrors) {
          if (error.extensions.code === "UNAUTHENTICATED" && authContext) {
            authContext.current.setAuthenticatedUser();
            localStorage.removeItem("userToken");
            return;
          }

          console.log(error);
        }
      }

      console.log(networkError);
    },
  });

  console.log(1);

  return (
    <ApolloProvider client={client}>
      <SocketContextProvider>
        <AuthContextProvider ref={authContext}>
          <App />
        </AuthContextProvider>
      </SocketContextProvider>
    </ApolloProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
