import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function OverlayContainer({ isOpen, toggle, children, title }) {
  if (isOpen)
    return (
      <div className="overlay-container">
        <div className="overlay-container-header bg-dark">
          <button className="btn-clear" onClick={toggle}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h5 className="ml-4">{title}</h5>
        </div>
        <div className="overlay-container-content">{children}</div>
      </div>
    );

  return;
}

OverlayContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default OverlayContainer;
