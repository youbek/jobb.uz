import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "hooks";

import Search from "./Search";

import Logo from "icons/logo.svg";

const StyledHeader = styled.nav`
  background-color: #2c3038;

  @media screen and (max-width: 768px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 4px 15px;
  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 960px;
  }
`;

const LogoContainer = styled(Link)`
  width: 130px;
  text-decoration: none;
  background-color: transparent;

  img {
    width: 100%;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Container>
        <LogoContainer to="/">
          <img src={Logo} alt="jobb.uz-logo" />
        </LogoContainer>
        <Search />
      </Container>
    </StyledHeader>
  );
}

export default Header;
