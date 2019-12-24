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
  const [openModal, setOpenModal] = useState({
    login: false,
    register: false,
    registerHr: false,
    jobSearchMobile: false,
    loginMobile: false,
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const userIcon = React.createRef();

  const { authenticatedUser } = useContext(AuthContext);

  const toggleModals = modal => {
    setOpenModal({ ...openModal, [modal]: !openModal[modal] });
  };

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
                        onClick={() => toggleModals("loginMobile")}
                      >
                        Login
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                )}
                <a
                  className="mobile-search"
                  onClick={() => toggleModals("jobSearchMobile")}
                >
                  <FontAwesomeIcon icon={faSearch} color="#fff" />
                </a>
                {openModal.jobSearchMobile && (
                  <JobsFilterMobile
                    showJobSearchMobile={openModal.jobSearchMobile}
                    toggleJobSearchMobile={() =>
                      toggleModals("jobSearchMobile")
                    }
                  />
                )}
                {openModal.loginMobile && (
                  <LoginModalMobile
                    showLoginModalMobile={openModal.loginMobile}
                    toggleLoginModalMobile={() => toggleModals("loginMobile")}
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
                        <ButtonLink to="/hr">Post a Job</ButtonLink>
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
                      <Button onClick={() => toggleModals("registerHr")}>
                        Post a Job
                      </Button>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => toggleModals("register")}>
                        Register
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => toggleModals("login")}>
                        Login
                      </NavLink>
                    </NavItem>
                  </React.Fragment>
                )}
                {openModal.login && (
                  <LoginModal
                    showLoginModal={openModal.login}
                    toggleLoginModal={() => toggleModals("login")}
                    toggleRegisterModal={() => toggleModals("register")}
                  />
                )}
                {(openModal.register || openModal.registerHr) && (
                  <RegisterModal
                    isHr={openModal.registerHr}
                    showRegisterModal={openModal.register}
                    toggleRegisterModal={() => toggleModals("register")}
                    toggleRegisterHrModal={() => toggleModals("registerHr")}
                    toggleLoginModal={() => toggleModals("login")}
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
