import styled from "styled-components";

const TableCol = styled.div`
  padding: 0.5rem;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-basis: auto;
  }
`;

export default TableCol;
