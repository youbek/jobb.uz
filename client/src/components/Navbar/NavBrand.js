import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBrand = styled(Link)`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;

  img {
    width: 130px;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 120px;
    }
  }
`;

export default NavBrand;
