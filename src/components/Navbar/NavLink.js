import styled from "styled-components";
import { Link } from "react-router-dom";

const NavLink = styled(Link)`
  color: #fff;
  display: block;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s ease-in-out;

  &:hover {
    text-decoration: none;
    color: #d7d7d7;
  }
`;

export default NavLink;
