import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { JobPage, JobsFeedPage, NotFound404 } from "pages";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/vacancy/:hashId"
          render={(routerProps) => {
            const hashId = routerProps.match.params.hashId;
            return <JobPage hashId={hashId} />;
          }}
        />
        <Route exact path="/" component={JobsFeedPage} />
        <Route component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default Routes;
