import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";

import Logo from "../../icons/Logo.svg";
import { Link } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  Form,
  NavItem,
  Input,
  InputGroup,
  Container,
  Nav,
  Button,
  NavLink,
  Collapse,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AppHeader() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterHrModal, setShowRegisterHrModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { authenticatedUser } = useContext(AuthContext);

  function toggleLoginModal() {
    setShowLoginModal(!showLoginModal);
  }

  function toggleRegisterModal() {
    setShowRegisterModal(!showRegisterModal);
  }

  function toggleRegisterHrModal() {
    setShowRegisterHrModal(!showRegisterHrModal);
  }

  return (
    <React.Fragment>
      <Navbar color="dark" expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src={Logo} alt="joblink-logo" />
          </NavbarBrand>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Form inline className="mr-5">
                <InputGroup className="header-search">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="header-search-icon"
                  />
                  <Input
                    placeholder="Search jobs"
                    className="header-search-input"
                  ></Input>
                  <Input type="select" className="header-search-select">
                    <option>New York</option>
                    <option value="">Seattle</option>
                  </Input>
                  <Button className="btn-search-job">Search</Button>
                </InputGroup>
              </Form>
              {authenticatedUser ? (
                authenticatedUser.isHr ? (
                  <NavItem>
                    <NavLink tag={Link} to="/hr">
                      Post a Job
                    </NavLink>
                  </NavItem>
                ) : (
                  <NavItem>
                    <NavLink tag={Link} to="/applicant/resume">
                      My Resume
                    </NavLink>
                  </NavItem>
                )
              ) : (
                <NavItem>
                  <NavLink onClick={toggleRegisterHrModal}>Post a Job</NavLink>
                </NavItem>
              )}

              {authenticatedUser ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink tag={Link} to="/profile">
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/logout">
                      Log out
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem>
                    <NavLink onClick={toggleRegisterModal}>Register</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={toggleLoginModal}>Login</NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {showLoginModal && (
        <LoginModal
          showLoginModal={showLoginModal}
          toggleLoginModal={toggleLoginModal}
          toggleRegisterModal={toggleRegisterModal}
        />
      )}
      {(showRegisterModal || showRegisterHrModal) && (
        <RegisterModal
          isHr={showRegisterHrModal}
          showRegisterModal={showRegisterModal}
          toggleRegisterModal={toggleRegisterModal}
          toggleRegisterHrModal={toggleRegisterHrModal}
          toggleLoginModal={toggleLoginModal}
        />
      )}
    </React.Fragment>
  );
}

export default AppHeader;
