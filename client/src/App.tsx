import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ErrorBoundary, Header } from "components";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <Routes />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
