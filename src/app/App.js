import React from "react";
import ErrorBoundry from "../components/ErrorBoundry";
import Routes from "./Routes";

const App = () => {
  return (
    <ErrorBoundry>
      <Routes />
    </ErrorBoundry>
  );
};

export default App;
