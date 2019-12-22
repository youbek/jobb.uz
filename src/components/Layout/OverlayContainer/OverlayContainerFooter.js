import React from "react";
import PropTypes from "prop-types";

function OverlayContainerFooter({ children }) {
  return <div className="overlay-container-footer">{children}</div>;
}

OverlayContainerFooter.propTypes = {
  children: PropTypes.element,
};

export default OverlayContainerFooter;
