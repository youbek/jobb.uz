import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media screen and (min-width: 1200px) {
    max-width: 960px;
  }
  @media screen and (max-width: 768px) {
    padding-right: 0;
    padding-left: 0;
  }
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export default NavContainer;