import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import clamp from "clamp-js";

import { Link } from "react-router-dom";
import Container from "components/Layout/Container";

const Wrapper = styled.div`
  background-color: #2c3038;
  border-top: 1px solid #3c3c3c;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
`;

const StyledBreadcrumb = styled(Container)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 0;
  font-weight: 600;
  list-style: none;
`;

const BreadcrumbItem = styled.div`
  display: inline-block;
  position: relative;
  font-size: 14px;
  color: #e2e2e2;

  a {
    color: #e2e2e2;

    &:hover {
      color: #e2e2e2;
      text-decoration: none;
    }
  }

  & + & {
    padding-left: 0.5rem;
  }

  & + &:before {
    display: inline-block;
    padding-right: 0.5rem;
    color: #e2e2e2;
    content: "/";
  }
`;

interface IPath {
  text: string;
  url?: string;
}

interface Props {
  paths: IPath[];
}

function Breadcrumb({ paths }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    truncate();
  }, []);

  function truncate() {
    if (!container.current) {
      return;
    }

    clamp(container.current, { clamp: 1 });
  }

  return (
    <Wrapper>
      <StyledBreadcrumb>
        <div ref={container}>
          <BreadcrumbItem>
            <Link to="/">Работа в Ташкенте</Link>
          </BreadcrumbItem>
          {paths.map((path, index) => (
            <BreadcrumbItem key={index}>
              {path.url ? <Link to={path.url}>{path.text}</Link> : path.text}
            </BreadcrumbItem>
          ))}
        </div>
      </StyledBreadcrumb>
    </Wrapper>
  );
}

export default Breadcrumb;
