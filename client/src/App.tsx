import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ErrorBoundary, Header } from "components";
import GlobalStyle from "./theme/globalStyle";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Header />  
        <Routes />
      </Router>
      <GlobalStyle />
    </ErrorBoundary>
  );
}

export default App;
