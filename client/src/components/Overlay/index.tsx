import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "icons/arrow-left.svg";

const root = document.getElementById("overlay");

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 1024;
  overflow-y: scroll;
`;

const Header = styled.div`
  padding: 0.5rem 1rem;
  height: 55px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  color: #fff;
  background-color: #2c3038;
`;

const HeaderTitle = styled.div`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const BackButton = styled.button`
  cursor: pointer;
  width: 20px;
  background: none;
  border: none;
  padding: 0;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;

  & > div {
    flex-grow: 1;
    padding: 1rem;
    background-color: #fff;
  }
`;

interface Props {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  title: string;
}

function Overlay({ isOpen, toggle, title, children }: Props) {
  if (!root) {
    console.error("root element not found");
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <Wrapper>
      <Header>
        <BackButton onClick={toggle}>
          <ArrowIcon />
        </BackButton>
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      <Content>{children}</Content>
    </Wrapper>,
    root
  );
}

export default Overlay;
