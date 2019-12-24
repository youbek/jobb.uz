import styled from "styled-components";

const Col4 = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  display: none;
  @media screen and (min-width: 768px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  @media screen and (min-width: 1200px) {
    display: block !important;
  }
`;

export default Col4;
