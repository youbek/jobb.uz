import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import arrowLeft from "../../icons/arrowLeft.svg";

const MobileHeaderWrapper = styled.div``;
const MobileHeaderOffset = styled.div`
  min-height: 55px;
`;
const MobileHeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  background-color: #2c3038;
`;
const MobileHeaderContent = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 55px;
  color: #fff;
  align-items: center;
`;
const ButtonBack = styled.button`
  width: 20px;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const MobileHeaderTitle = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 1rem;
  font-size: 1.25rem;
`;

function MobileHeader({ title, history }) {
  return (
    <MobileHeaderWrapper>
      <MobileHeaderOffset />
      <MobileHeaderContainer>
        <MobileHeaderContent>
          <ButtonBack onClick={history.goBack}>
            <img src={arrowLeft} />
          </ButtonBack>
          <MobileHeaderTitle>{title}</MobileHeaderTitle>
        </MobileHeaderContent>
      </MobileHeaderContainer>
    </MobileHeaderWrapper>
  );
}

MobileHeader.propTypes = {
  title: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(MobileHeader);
