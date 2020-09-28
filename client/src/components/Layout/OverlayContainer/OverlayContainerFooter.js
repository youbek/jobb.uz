import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #eeee;

  > button {
    padding: 0.75rem;
  }

  button {
    color: #222;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      color: #222;
    }
  }
`;

function OverlayContainerFooter({ children }) {
  return <Container>{children}</Container>;
}

OverlayContainerFooter.propTypes = {
  children: PropTypes.element,
};

export default OverlayContainerFooter;
