import styled, { css } from "styled-components";

type Size = "col4" | "col8" | "col12";

const Col = styled.div<{ size: Size }>`
  position: relative;
  padding-right: 15px;
  padding-left: 15px;

  width: ${({ size }) => {
    if (size === "col4") return "33.333333%";
    if (size === "col8") return "66.666667%";
    if (size === "col12") return "100%";

    return null;
  }};

  max-width: ${({ size }) => {
    if (size === "col4") return "33.333333%";
    if (size === "col8") return "66.666667%";
    if (size === "col12") return "100%";

    return null;
  }};

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

export default Col;
