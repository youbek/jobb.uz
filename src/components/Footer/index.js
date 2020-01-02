import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background: #fbfbfb;
  border-top-left-radius: 3px;
  color: #494949;
  border: 1px solid #eee;
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
`;

function Footer() {
  return (
    <FooterContainer>
      <div>by © Yusufbek Alimatov 👉</div>
    </FooterContainer>
  );
}

export default Footer;
