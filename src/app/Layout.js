import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ProtectedRoute from "../components/ProtectedRoute";

import AppHeaderContextProvider from "../context/AppHeaderContext";
import JobsFeedPage from "../pages/JobsFeedPage";
import JobPage from "../pages/JobPage";
import RegisterPage from "../pages/RegisterPage";
import LogInPage from "../pages/LogInPage";
import ProfilePage from "../pages/ProfilePage";
import ResumePage from "../pages/ResumePage";
import LogOut from "../components/LogOut";

import VacancyForm from "../hr/VacancyForm";
import Footer from "../components/Footer";

import _ from "lodash";

function Layout() {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  return (
    <Fragment>
      <AppHeaderContextProvider>
        <Switch>
          <ProtectedRoute
            path="/hr"
            exact
            unLoggedProtected={true}
            provideRouteProps={true}
            Component={VacancyForm}
          />
          <ProtectedRoute
            path="/login"
            exact
            unLoggedProtected={false}
            Component={LogInPage}
          />
          <ProtectedRoute
            path="/register"
            exact
            unLoggedProtected={false}
            Component={RegisterPage}
          />
          <ProtectedRoute
            path="/applicant/resume"
            exact
            unLoggedProtected={true}
            Component={ResumePage}
          />
          <Route path="/logout" exact component={LogOut} />
          <Route path="/register" exact component={RegisterPage} />
          <Route
            exact
            path="/vacancy/:hashId"
            render={routerProps => {
              const hashId = routerProps.match.params.hashId;
              return <JobPage hashId={hashId} />;
            }}
          />
          <ProtectedRoute
            path="/profile"
            exact
            unLoggedProtected={true}
            Component={ProfilePage}
          />
          <Route
            exact
            path="/:categoryName?/:subCategoryName?"
            render={routerProps => {
              const categoryName = _.startCase(
                _.toLower(routerProps.match.params.categoryName),
              );
              const subCategoryName = _.startCase(
                _.toLower(routerProps.match.params.subCategoryName),
              );
              return (
                <JobsFeedPage
                  match={routerProps.match}
                  categoryName={categoryName}
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
