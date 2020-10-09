import React from "react";
import styled, { css } from "styled-components";

interface Props {
  color: "green" | "blue";
}

const green = css`
  color: #468a74;
  border: 1px solid #468a74;
`;

const blue = css`
  color: #148c96;
  border: 1px solid #148c96;
`;

const Badge = styled.span<Props>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #cc3d86;
  box-sizing: border-box;
  padding: 4px 10px;
  margin-right: 5px;
  border: 1px solid #cc3d86;
  border-radius: 4px;

  ${({ color }) => color === "green" && green}
  ${({ color }) => color === "blue" && blue}
`;

export default Badge;
