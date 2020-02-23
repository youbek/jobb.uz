import styled from "styled-components";

const Col = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  display: ${props => (props.col4 ? "none" : "block")};
  @media screen and (min-width: 768px) {
    flex: ${props => {
      if (props.col4) return "0 0 33.333333%";
      if (props.col8) return "0 0 66.666667%";
      if (props.col12) return "0 0 100%";
    }};
    max-width: ${props => {
      if (props.col4) return "33.333333%";
      if (props.col8) return "66.666667%";
      if (props.col12) return "100%";
    }};
  }
  @media screen and (min-width: 1200px) {
    display: ${props => props.col4 && "block !important;"};
  }
`;

export default Col;
