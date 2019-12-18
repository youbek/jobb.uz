import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function MobileHeader({ title, backHandler, history }) {
  return (
    <div className="mobile-header-wrapper ">
      <div className="mobile-header-offset" />
      <div className="mobile-header bg-dark">
        <div className="mobile-header-content">
          <button className="btn-clear" onClick={history.goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="mobile-header-title ml-4">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MobileHeader);
