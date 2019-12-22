import styled from "styled-components";
import { ButtonBack } from "pure-react-carousel";

const PrevButton = styled(ButtonBack)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #d5d5d5;
  padding: 0;
  left: -30px;
  top: 26px;
  display: block;
  margin: 0;
  background-color: #fff;
  z-index: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default PrevButton;
