import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function MobileHeader({ toggle, title }) {
  return (
    <div className="mobile-header-wrapper ">
      <div className="mobile-header-offset" />
      <div className="mobile-header bg-dark">
        <div className="mobile-header-content">
          <button className="btn-clear" onClick={toggle}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="mobile-header-title ml-4">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
