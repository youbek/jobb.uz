import React from "react";
import styled from "styled-components";

interface StyledBadgeProps {
  color: "green" | "blue";
}

const StyledBadge = styled.span<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: ${({ color }) => {
    if (color === "green") return "#468A74";
    if (color === "blue") return "#148C96";
    return "#CC3D86";
  }};
  box-sizing: border-box;
  padding: 4px 10px;
  margin-right: 5px;
  border: 1px solid
    ${({ color }) => {
      if (color === "green") return "#468A74";
      if (color === "blue") return "#148C96";
      return "#CC3D86";
    }};
  border-radius: 4px;
`;

interface Props extends StyledBadgeProps {
  children: React.ReactNode;
}

function Badge({ color, children }: Props) {
  return <StyledBadge color={color}>{children}</StyledBadge>;
}

export default Badge;
