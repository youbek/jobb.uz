import React from "react";
import PropTypes from "prop-types";
import OverlayContainer from "./OverlayContainer/OverlayContainer";
import JobsFilter from "./JobsFilter";

function JobsFilterMobile({ showJobSearchMobile, toggleJobSearchMobile }) {
  return (
    <OverlayContainer
      isOpen={showJobSearchMobile}
      toggle={toggleJobSearchMobile}
      title="Search jobs"
    >
      <JobsFilter />
    </OverlayContainer>
  );
}

JobsFilterMobile.propTypes = {
  showJobSearchMobile: PropTypes.bool.isRequired,
  toggleJobSearchMobile: PropTypes.func.isRequired,
};

export default JobsFilterMobile;
