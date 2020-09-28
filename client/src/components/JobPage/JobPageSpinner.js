import React from "react";
import JobPageContainer from "./JobPageContainer";
import Row from "../Layout/Row";
import Spinner from "../Spinner/Spinner";

function JobPageSpinner() {
  return (
    <JobPageContainer style={{ marginTop: 43 }}>
      <Row>
        <Spinner />
      </Row>
    </JobPageContainer>
  );
}

export default JobPageSpinner;
