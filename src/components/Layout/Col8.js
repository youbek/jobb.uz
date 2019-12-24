import styled from "styled-components";

const Col8 = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  @media screen and (min-width: 768px) {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
`;

export default Col8;
