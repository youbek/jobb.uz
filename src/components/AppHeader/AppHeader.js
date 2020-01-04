import React, { useState } from "react";
import PropTypes from "prop-types";

import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import JobsFilterMobile from "../JobsFeed/JobsFilter/JobsFilterMobile";
import MobileHeader from "./MobileHeader";
import Logo from "../../icons/Logo.svg";
import HeaderSearch from "./HeaderSearch";
import Navbar from "../Navbar/Navbar";
import NavContainer from "../Navbar/NavContainer";
import NavBrand from "../Navbar/NavBrand";
import NavbarNav from "../Navbar/NavbarNav";

function AppHeader({ appHeaderState }) {
  const isMobileAndIsTablet = useMediaQuery({
    query: "(max-device-width: 992px )",
  });
  const isDesktop = useMediaQuery({ query: "(min-device-width: 992px )" });
  const [searchMobile, setSearchMobile] = useState(false);
  function toggleSearchMobile() {
    setSearchMobile(!searchMobile);
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
            )}

            {isDesktop && <HeaderSearch />}
          </NavbarNav>
        </NavContainer>
      </Navbar>
    </React.Fragment>
  );
}

export default AppHeader;
