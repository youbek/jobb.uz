import React from "react";
import PropTypes from "prop-types";
import OverlayContainer from "../../Layout/OverlayContainer/OverlayContainer";
import JobsFilter from "./JobsFilter";

function JobsFilterMobile({ searchMobile, toggleSearchMobile }) {
  return (
    <OverlayContainer
      isOpen={searchMobile}
      toggle={toggleSearchMobile}
      title="Search jobs"
    >
      <JobsFilter />
    </OverlayContainer>
  );
}

JobsFilterMobile.propTypes = {
  searchMobile: PropTypes.bool.isRequired,
  toggleSearchMobile: PropTypes.func.isRequired,
};

export default JobsFilterMobile;
