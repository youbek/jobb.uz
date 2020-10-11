import React from "react";
import { Route, Switch } from "react-router-dom";
import { Vacancy, Main, NotFound404 } from "pages";

function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/vacancy/:hashId" component={Vacancy} />
        <Route component={NotFound404} />
      </Switch>
  );
}

export default Routes;
