import React, { useState } from "react";
import PropTypes from "prop-types";

import { useWindowDimensions } from "hooks";

import {
  Navbar,
  NavbarNav,
  NavBrand,
  NavContainer,
  JobsFilterMobile,
} from "components";

import MobileHeader from "./MobileHeader";
import HeaderSearch from "./HeaderSearch";

import Logo from "../../icons/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AppHeader({ appHeaderState }) {
  const isTablet = useWindowDimensions();

  const [searchMobile, setSearchMobile] = useState(false);
  const isMobileHeader =
    isTablet && window.location.pathname.split("/")[1] === "vacancy";

  function toggleSearchMobile() {
    setSearchMobile(!searchMobile);
  }

  if (isMobileHeader) return <MobileHeader title={appHeaderState.title} />;

  return (
    <React.Fragment>
      <Navbar>
        <NavContainer>
          <NavBrand to="/">
            <img src={Logo} alt="joblink-logo" />
          </NavBrand>
          <NavbarNav>
            {isTablet ? (
              <React.Fragment>
                <a className="mr-2" onClick={toggleSearchMobile}>
                  <FontAwesomeIcon icon={faSearch} color="#fff" />
                </a>
                {searchMobile && (
                  <JobsFilterMobile
                    searchMobile={searchMobile}
                    toggleSearchMobile={toggleSearchMobile}
                  />
                )}
              </React.Fragment>
            ) : (
              <HeaderSearch />
            )}
          </NavbarNav>
        </NavContainer>
      </Navbar>
    </React.Fragment>
  );
}

AppHeader.propTypes = {
  appHeaderState: PropTypes.object,
};

export default AppHeader;
