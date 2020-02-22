import React from "react";
import PropTypes from "prop-types";
import { render as renderRtl } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";

import "jest-styled-components";

function render(ui, options) {
  return renderRtl(ui, { ...options, wrapper: Wrapper });
}

function Wrapper({ children }) {
  return <Router>{children}</Router>;
}

Wrapper.propTypes = {
  children: PropTypes.node,
};

export * from "@testing-library/react";
export { render };
