import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import LoginModalMobile from "./modals/LoginModalMobile";
import JobsFilterMobile from "../JobsFeed/JobsFilter/JobsFilterMobile";
import MobileHeader from "./MobileHeader";
import ProfileDropdown from "./ProfileDropdown";

import Logo from "../../icons/Logo.svg";
import { Link } from "react-router-dom";

import Button from "../Buttons/Button";
import ButtonLink from "../Buttons/ButtonLink";
import NavItem from "../Navbar/NavItem";
import NavLink from "../Navbar/NavLink";
import FormInline from "../Form/FormInline";
import HeaderSearch from "./HeaderSearch";
import Navbar from "../Navbar/Navbar";
import NavContainer from "../Navbar/NavContainer";
import NavBrand from "../Navbar/NavBrand";
import NavbarNav from "../Navbar/NavbarNav";

import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

function AppHeader({ appHeaderState }) {
  const isMobileAndIsTablet = useMediaQuery({
    query: "(max-device-width: 992px )",
  });
  const isDesktop = useMediaQuery({ query: "(min-device-width: 992px )" });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showRegisterHrModal, setShowRegisterHrModal] = useState(false);
  const [showJobSearchMobile, setShowJobSearchMobile] = useState(false);
  const [showLoginModalMobile, setShowLoginModalMobile] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const userIcon = React.createRef();

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

  function toggleProfileDropdown() {
    setShowProfileDropdown(!showProfileDropdown);
  }

  const isMobileHeader =
    isMobileAndIsTablet && window.location.pathname.split("/")[1] === "vacancy";
  if (isMobileHeader) return <MobileHeader title={appHeaderState.title} />;

  return (
    <React.Fragment>
      <Navbar>
        <NavContainer>
          <NavBrand to="/">
            <img src={Logo} alt="joblink-logo" />
          </NavBrand>
          <NavbarNav>
            {isMobileAndIsTablet && (
              <React.Fragment>
                {authenticatedUser ? (
                  <React.Fragment>
                    <NavItem>
                      {authenticatedUser.isHr ? (
                        <NavLink to="/hr">Post a Job</NavLink>
                      ) : (
                        <NavLink to="/applicant/resume">My Resume</NavLink>
                      )}
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={toggleProfileDropdown}
                        innerRef={userIcon}
                      >
                        <FontAwesomeIcon icon={faUser} color="#fff" />
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
                <FormInline className="mr-4">
                  <HeaderSearch />
                </FormInline>
                {authenticatedUser ? (
                  <React.Fragment>
                    <NavItem>
                      {authenticatedUser.isHr ? (
                        <ButtonLink className="mr-2" to="/hr">
                          Post a Job
                        </ButtonLink>
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
                      <Button onClick={toggleRegisterHrModal}>
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
          </NavbarNav>
        </NavContainer>
      </Navbar>
      {showProfileDropdown && (
        <ProfileDropdown
          user={authenticatedUser}
          toggleProfileDropdown={toggleProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          ref={userIcon}
        />
      )}
    </React.Fragment>
  );
}

export default AppHeader;
