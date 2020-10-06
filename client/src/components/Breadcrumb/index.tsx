import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledBreadcrumb = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #2c3038;
  border-bottom: 1px solid #eee;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  margin-bottom: 2rem;
  margin-top: 0;
  color: #fff9;
  font-weight: 600;
  border-top: 1px solid #3c3c3c;
  list-style: none;
`;

const StyledBreadcrumb__Item = styled.div`
  display: inline-block;
  position: relative;
  padding-bottom: 10px;
  font-size: 14px;

  a {
    color: #fff9;

    &:hover {
      color: #fff9;
      text-decoration: none;
    }
  }

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

interface Props {
  categoryName?: string;
}

function Breadcrumb({ categoryName }: Props) {
  return (
    <StyledBreadcrumb>
      <StyledBreadcrumb__Item>
        <Link to="/">Работа в Ташкенте</Link>
      </StyledBreadcrumb__Item>
      <StyledBreadcrumb__Item>
        <Link to="/">{categoryName}</Link>
      </StyledBreadcrumb__Item>
    </StyledBreadcrumb>
  );
}

export default Breadcrumb;
