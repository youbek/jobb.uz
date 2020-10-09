import styled, { css } from "styled-components";

type Size = "col4" | "col8" | "col12";

const Col = styled.div<{ size: Size }>`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  flex: ${({ size }) => {
    if (size === "col4") return "0 0 33.333333%";
    if (size === "col8") return "0 0 66.666667%";
    if (size === "col12") return "0 0 100%";

    return null;
  }};

  max-width: ${({ size }) => {
    if (size === "col4") return "0 0 33.333333%";
    if (size === "col8") return "0 0 66.666667%";
    if (size === "col12") return "0 0 100%";

    return null;
  }};
`;

export default Col;
