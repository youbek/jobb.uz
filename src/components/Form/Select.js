import styled from "styled-components";

const Select = styled.select`
  display: block;
  width: ${props => (props.width ? props.width : "100%")};
  height: 45px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  word-wrap: normal;
  border-top-left-radius: ${props => {
    if (props.left) return "0";
  }};
  border-bottom-left-radius: ${props => {
    if (props.left) return "0";
  }};
  border-top-right-radius: ${props => {
    if (props.right) return "0";
  }};
  border-bottom-right-radius: ${props => {
    if (props.right) return "0";
  }};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export default Select;
