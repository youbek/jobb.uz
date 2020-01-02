import React from "react";
import styled from "styled-components";
import NavContainer from "./NavContainer";

const Navbar = styled.nav`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  background-color: #2c3038;

  @media screen and (max-width: 768px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

// function Navbar({ children }) {
//   return (
//     <Nav>
//       <NavContainer></NavContainer>
//     </Nav>
//   );
// }

export default Navbar;
