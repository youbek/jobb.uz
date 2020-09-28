import styled from "styled-components";
import { ButtonNext } from "pure-react-carousel";

const NextButton = styled(ButtonNext)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #d5d5d5;
  padding: 0;
  right: -45px;
  top: 35px;
  display: block;
  margin: 0;
  background-color: #fff;
  z-index: 2;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export default NextButton;
