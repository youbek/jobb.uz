import styled from "styled-components";

const BreadcrumbItem = styled.li`
  display: inline-block;
  position: relative;
  padding-bottom: 10px;
  font-size: 14px;

  & + & {
    padding-left: 0.5rem;
  }

  & + &:before {
    display: inline-block;
    padding-right: 0.5rem;
    color: #6c757d;
    content: "/";
  }
`;

export default BreadcrumbItem;
