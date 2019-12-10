import React, { useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { CHECK_TOKEN } from "../graphql/queries";

function ProtectedRoute({
  path,
  redirectTo,
  exact,
  unLoggedProtected,
  Component,
}) {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const token = localStorage.getItem("userToken") || "";

  const { loading, error, data } = useQuery(CHECK_TOKEN, {
    variables: { token },
  });

  useEffect(() => {
    if (!loading) {
      if (!data.checkToken) {
        setAuthenticatedUser(null);
      }
    }
  }, [loading, error, data]);

  if (loading) return null;

  if (!data.checkToken && unLoggedProtected) {
    return <Redirect to={redirectTo} />;
  }

  if (data.checkToken && !unLoggedProtected) {
    return <Redirect to={redirectTo} />;
  }

  if (!authenticatedUser) {
    return null;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={routerProps => <Component {...routerProps} />}
    />
  );
}

PropTypes.defaultProps = {
  exact: false,
  redirectTo: "/",
  unLoggedProtected: true,
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  redirectTo: PropTypes.string,
  unLoggedProtected: PropTypes.bool,
  Component: PropTypes.element.isRequired,
};

export default ProtectedRoute;
