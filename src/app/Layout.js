import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import queryString from "query-string";

import ScrollToTop from "../components/ScrollToTop";
import AppHeaderContextProvider from "../context/AppHeaderContext";
import JobsFeedPage from "../pages/JobsFeedPage";
import JobPage from "../pages/JobPage";
import Footer from "../components/Footer/index";

function Layout() {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  return (
    <Fragment>
      <AppHeaderContextProvider>
        <ScrollToTop />
        <Switch>
          <Route
            exact
            path="/vacancy/:hashId"
            render={routerProps => {
              const hashId = routerProps.match.params.hashId;
              return <JobPage hashId={hashId} />;
            }}
          />

          <Route
            exact
            path="/"
            render={routerProps => {
              const jobSearchQueryStr = routerProps.location.search;
              const searchFilters = queryString.parse(jobSearchQueryStr, {
                parseBooleans: true,
                parseNumbers: true,
              });

              return (
                <JobsFeedPage
                  searchFilters={searchFilters}
                  redirect={routerProps.history.push}
                />
              );
            }}
          />
          <Route render={() => <Redirect to="/404" />} />
        </Switch>
      </AppHeaderContextProvider>

      {!isMobile && <Footer />}
    </Fragment>
  );
}

export default Layout;
