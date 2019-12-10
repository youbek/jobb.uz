import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import JobsFeedPage from "../pages/JobsFeedPage";
import JobPage from "../pages/JobPage";
import RegisterPage from "../pages/RegisterPage";
import LogInPage from "../pages/LogInPage";
import ProfilePage from "../pages/ProfilePage";
import ResumePage from "../pages/ResumePage";
import LogOut from "../components/LogOut";

import AppHeader from "../components/AppHeader/AppHeader";
import VacancyForm from "../hr/VacancyForm";

function Layout() {
  return (
    <Fragment>
      <AppHeader />
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
          path="/:categoryName?/:popularJobTitles?"
          render={routerProps => {
            const categoryName = routerProps.match.params.categoryName;
            const popularJobTitles = routerProps.match.params.popularJobTitles;
            return (
              <JobsFeedPage
                match={routerProps.match}
                categoryName={categoryName}
                popularJobTitles={popularJobTitles}
                currentUrl={routerProps.match.url}
              />
            );
          }}
        />
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </Fragment>
  );
}

export default Layout;
