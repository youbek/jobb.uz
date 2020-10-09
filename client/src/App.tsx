import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ErrorBoundary, Header } from "components";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
