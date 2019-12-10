import React from "react";

import {
  Container,
  Row,
  Col,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

const user = {
  resume: null,
};

function ResumePage() {
  return (
    <React.Fragment>
      <Breadcrumb>
        <Container>
          <BreadcrumbItem>Applicant</BreadcrumbItem>
          <BreadcrumbItem>My Resume</BreadcrumbItem>
        </Container>
      </Breadcrumb>
      <Container>
        <Row>
          <Col>
            {!user.resume && (
              <Alert>Please create a resume to apply for jobs</Alert>
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ResumePage;
