import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  border: 0;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: ${props => (props.secondary ? "#4687FF" : "#F64F64")};
  padding: 0.62rem 1.5rem;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: ${props => (props.secondary ? "#3669c6" : "#db495b")};
    color: #fff;
    text-decoration: none;
  }
`;

export default ButtonLink;
