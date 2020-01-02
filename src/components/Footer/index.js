import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background: #fbfbfb;
  border-top-left-radius: 3px;
  color: #494949;
  border: 1px solid #e2e2e2;
  padding: 0.5rem;
  font-size: 14px;
  position: fixed;
  bottom: 21px;
  bottom: 0;
  right: 0;
  border-right: none;
  border-bottom: none;
  cursor: pointer;
  z-index: 1;

  a {
    color: #494949;

    &:hover {
      color: #494949;
      text-decoration: none;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <a href="https://yusufbek.com" rel="noopener noreferrer" target="_blank">
        by © Yusufbek Alimatov 👉
      </a>
    </FooterContainer>
  );
}

export default Footer;
