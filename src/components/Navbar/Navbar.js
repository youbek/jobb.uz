import React from "react";
import styled from "styled-components";
import NavContainer from "./NavContainer";

const Navbar = styled.nav`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem;
  background-color: #2c3038;

  @media screen and (max-width: 768px) {
    padding: 1rem;
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
