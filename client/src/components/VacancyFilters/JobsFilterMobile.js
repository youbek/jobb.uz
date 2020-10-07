import React from "react";
import PropTypes from "prop-types";
import OverlayContainer from "../../Layout/OverlayContainer/OverlayContainer";
import JobsFilter from "./JobsFilter";

import { useJobFilter } from "hooks";

function JobsFilterMobile({ searchMobile, toggleSearchMobile }) {
  const filters = useJobFilter()[2];

  return (
    <OverlayContainer
      isOpen={searchMobile}
      toggle={toggleSearchMobile}
      title="Поиск работы"
    >
      <JobsFilter filters={filters} toggleSearchMobile={toggleSearchMobile} />
    </OverlayContainer>
  );
}

JobsFilterMobile.propTypes = {
  searchMobile: PropTypes.bool.isRequired,
  toggleSearchMobile: PropTypes.func.isRequired,
};

export default JobsFilterMobile;
