import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "styled-react-modal";
import arrowLeft from "../../../icons/arrowLeft.svg";

const StyledModal = styled(Modal)``;

const OverlayContainerHeader = styled.div`
  padding: 0.5rem 1rem;
  height: 55px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  color: #fff;
  background-color: #2c3038;
`;

const BackButton = styled.button`
  cursor: pointer;
  width: 20px;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  text-transform: none;
  overflow: visible;
  margin: 0;
  padding: 0;
`;

const HeaderTitle = styled.div`
  margin: 0;
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
`;

const OverlayContainerContent = styled.div`
  display: flex;
  flex-grow: 1;

  & > div {
    flex-grow: 1;
    padding: 1rem;
    background-color: #fff;
  }
`;

const Some = styled.div`
  width: 500px;
  height: 500px;
  background-color: #000;
`;

function OverlayContainer({ isOpen, toggle, children, title }) {
  return (
    <StyledModal isOpen={isOpen} opacity={100} toggle={toggle}>
      <OverlayContainerHeader>
        <BackButton onClick={toggle}>
          <img src={arrowLeft} />
        </BackButton>
        <HeaderTitle>{title}</HeaderTitle>
      </OverlayContainerHeader>
      <OverlayContainerContent>{children}</OverlayContainerContent>
    </StyledModal>
  );
}

OverlayContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default OverlayContainer;
