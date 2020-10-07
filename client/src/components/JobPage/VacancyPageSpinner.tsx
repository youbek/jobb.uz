import React from "react";
import VacancyPageContainer from "./VacancyPageContainer";
import Row from "../Layout/Row";
import Spinner from "../Spinner/Spinner";

function JobPageSpinner() {
  return (
    <VacancyPageContainer style={{ marginTop: 43 }}>
      <Row>
        <Spinner />
      </Row>
    </VacancyPageContainer>
  );
}

export default JobPageSpinner;
