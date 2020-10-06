import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound404 from "../pages/NotFound404";
import Layout from "./Layout";
import { ModalProvider } from "styled-react-modal";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 1024;
  overflow-y: scroll;
`;

function Routes() {
  return (
    <Router>
      <Switch>
        <ModalProvider backgroundComponent={Overlay}>
          <ScrollToTop />
          <Route exact path="/404" component={NotFound404} />
          <Route path="/" component={Layout} />
          <Route
            exact
            path="/vacancy/:hashId"
            render={(routerProps) => {
              const hashId = routerProps.match.params.hashId;
              return <JobPage hashId={hashId} />;
            }}
          />

          <Route
            exact
            path="/"
            render={() => {
              return <JobsFeedPage />;
            }}
          />
          <Route render={() => <Redirect to="/404" />} />
        </ModalProvider>
      </Switch>
    </Router>
  );
}

export default Routes;
