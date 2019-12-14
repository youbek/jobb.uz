import React from "react";
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

export default JobsFilterMobile;
