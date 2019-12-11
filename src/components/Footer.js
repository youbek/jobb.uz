import React from "react";
import { Container, Col, Row } from "reactstrap";

function Footer() {
  return (
    <footer className="border-top mt-4">
      <Container>
        <Row>
          <Col className="footer">
            <p>
              This website is for educational purposes only. Built to showcase
              my skills in full stack development.{" "}
              <a href="https://yusufbek.com">Contact Me</a>
            </p>
            <p>Copyright © 2019 Yusufbek Alimatov. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
