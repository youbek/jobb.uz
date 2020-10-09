import styled, { css } from "styled-components";

type Color = "primary" | "secondary" | "outline";

interface Props {
  color?: Color;
}

const outlineStyle = css`
  color: #5b5e64;
  border: 1px solid #cbd1d4;
  background-color: #fff;

  &:hover {
    color: #5b5e64;
    border: 1px solid #acb5ba;
  }
`;

const primaryStyle = css`
  background-color: #f64f64;

  &:hover {
    background-color: #db495b;
  }
`;

const secondaryStyle = css`
  background-color: #4687ff;

  &:hover {
    background-color: #3669c6;
  }
`;

const Button = styled.button<Props>`
  display: inline-block;
  font-weight: 600;
  border: 0;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 10px 16px;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${primaryStyle};

  ${({ color }) => color === "outline" && outlineStyle}
  ${({ color }) => color === "secondary" && secondaryStyle}
`;

export default Button;
