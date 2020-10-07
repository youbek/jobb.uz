import React from "react";
import Routes from "./routes";
import { ErrorBoundary } from "components";
import { ModalProvider } from "styled-react-modal";

function App() {
  return (
    <ErrorBoundary>
      <ModalProvider>{/* <Routes /> */}</ModalProvider>
    </ErrorBoundary>
  );
}

export default App;
