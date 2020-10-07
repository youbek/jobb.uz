import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import JobsFeedPage from "../pages/JobsFeedPage";
import JobPage from "../pages/JobPage";

import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer/index";

import { useWindowDimensions } from "hooks";

function Layout() {
  const isMobile = useWindowDimensions();

  return (
    <Fragment>
      <ScrollToTop />
      <Switch>
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
      </Switch>
    </Fragment>
  );
}

export default Layout;
