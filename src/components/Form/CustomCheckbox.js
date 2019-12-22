import styled from "styled-components";

const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    font-weight: normal;
    margin-top: 4px;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 26px;
    height: 26px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-top: -3px;
  }

  &:focus + label:before {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }

  &:checked + label:before {
    background: #f64f64;
    border: 0;
  }

  label. &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  &:checked + label:after {
    content: "✓";
    position: absolute;
    left: 5px;
    top: -3px;
    color: #fff;
    font-size: 20px;
  }
`;

export default CustomCheckbox;
