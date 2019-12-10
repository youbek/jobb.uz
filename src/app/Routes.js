import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound404 from "../pages/NotFound404";
import Layout from "./Layout";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/404" component={NotFound404} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  );
}

export default Routes;
