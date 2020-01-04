import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import jobCategories from "../constant/jobCategories";

import ScrollToTop from "../components/ScrollToTop";
import AppHeaderContextProvider from "../context/AppHeaderContext";
import JobsFeedPage from "../pages/JobsFeedPage";
import JobPage from "../pages/JobPage";
import Footer from "../components/Footer/index";

import _ from "lodash";

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
            path="/:categoryName?/:subCategoryName?"
            render={routerProps => {
              const categoryName = jobCategories.find(category =>
                category.transliteratedName ===
                routerProps.match.params.categoryName
                  ? category
                  : null,
              );
              const subCategoryName = _.startCase(
                _.toLower(routerProps.match.params.subCategoryName),
              );

              return (
                <JobsFeedPage
                  match={routerProps.match}
                  categoryName={categoryName && categoryName.name}
                  subCategoryName={subCategoryName}
                  currentUrl={routerProps.match.url}
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
