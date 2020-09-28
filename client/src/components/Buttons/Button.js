import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  font-weight: 600;
  border: 0;
  color: ${props => (props.grey ? "#5B5E64" : "#fff")};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: ${props => {
    {
      if (props.secondary) return "#4687FF";
      if (props.grey) return "#fff";
      return "#F64F64";
    }
  }};
  padding: 0.62rem 1.5rem;
  font-size: 14px;
  line-height: 1.5;
  border: ${props => props.grey && "1px solid #CBD1D4"};
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: ${props => {
      if (props.secondary) return "#3669c6";
      if (props.grey) return "#fff";
      return "#db495b";
    }};
    color: ${props => (props.grey ? "#5B5E64" : "#fff")};
    border: ${props => props.grey && "1px solid #acb5ba"};
    text-decoration: none;
  }
`;

export default Button;
