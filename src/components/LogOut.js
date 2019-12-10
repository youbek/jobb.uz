import React, { useContext } from "react";

import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function LogOut() {
  const { setAuthenticatedUser } = useContext(AuthContext);
  localStorage.removeItem("userToken");

  setAuthenticatedUser(null);

  return <Redirect to="/" />;
}

export default LogOut;
