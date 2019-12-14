import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import LoginModalMobile from "./modals/LoginModalMobile";
import JobsFilterMobile from "../JobsFilterMobile";

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
} from "reactstrap";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/react-hooks";

function AppHeader() {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  const isDesktop = useMediaQuery({ query: "(min-device-width: 992px )" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterHrModal, setShowRegisterHrModal] = useState(false);
  const [showJobSearchMobile, setShowJobSearchMobile] = useState(false);
  const [showLoginModalMobile, setShowLoginModalMobile] = useState(false);

  const [showModals, setShowModals] = useState(false);

  const { authenticatedUser } = useContext(AuthContext);

  function toggleModals(modal) {
    setShowModals(!modal);
  }

  function toggleLoginModal() {
    setShowLoginModal(!showLoginModal);
  }

  function toggleRegisterModal() {
    setShowRegisterModal(!showRegisterModal);
  }

  function toggleRegisterHrModal() {
    setShowRegisterHrModal(!showRegisterHrModal);
  }

  function toggleJobSearchMobile() {
    setShowJobSearchMobile(!showJobSearchMobile);
  }

  function toggleLoginModalMobile() {
    setShowLoginModalMobile(!showLoginModalMobile);
  }

  return (
    <React.Fragment>
      <Navbar color="dark" expand="md">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src={Logo} alt="joblink-logo" />
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            {
              // MOBILE
            }
            {isMobile && (
              <React.Fragment>
                {authenticatedUser ? (
                  <React.Fragment>
                    <NavItem>
                      {authenticatedUser.isHr ? (
                        <NavLink tag={Link} to="/hr">
                          Post a Job
                        </NavLink>
                      ) : (
                        <NavLink tag={Link} to="/applicant/resume">
                          My Resume
                        </NavLink>
                      )}
                    </NavItem>
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
                      <NavLink
                        className="mr-3 text-muted"
                        onClick={toggleLoginModalMobile}
                      >
                        Login
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                )}
                <a className="mobile-search" onClick={toggleJobSearchMobile}>
                  <FontAwesomeIcon icon={faSearch} color="#fff" />
                </a>
                {showJobSearchMobile && (
                  <JobsFilterMobile
                    showJobSearchMobile={showJobSearchMobile}
                    toggleJobSearchMobile={toggleJobSearchMobile}
                  />
                )}
                {showLoginModalMobile && (
                  <LoginModalMobile
                    showLoginModalMobile={showLoginModalMobile}
                    toggleLoginModalMobile={toggleLoginModalMobile}
                  />
                )}
              </React.Fragment>
            )}

            {isDesktop && (
              <React.Fragment>
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
                  <React.Fragment>
                    <NavItem>
                      {authenticatedUser.isHr ? (
                        <NavLink tag={Link} to="/hr">
                          Post a Job
                        </NavLink>
                      ) : (
                        <NavLink tag={Link} to="/applicant/resume">
                          My Resume
                        </NavLink>
                      )}
                    </NavItem>
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
                    <NavItem className="mr-2">
                      <Button
                        className="btn-custom"
                        onClick={toggleRegisterHrModal}
                      >
                        Post a Job
                      </Button>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={toggleRegisterModal}>Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={toggleLoginModal}>Login</NavLink>
                    </NavItem>
                  </React.Fragment>
                )}
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
            )}
          </Nav>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default AppHeader;
