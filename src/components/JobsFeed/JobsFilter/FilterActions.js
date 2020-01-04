import React from "react";
import styled from "styled-components";
import Button from "../../Buttons/Button";

const ButtonWrapper = styled.div`
  display: flex;

  ${Button} {
    flex-grow: 1;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

function FilterActions({ isMobile, handleResetFilter }) {
  return (
    <ButtonWrapper>
      <Button grey block={isMobile} onClick={handleResetFilter}>
        Сбросить Фильтр
      </Button>
    </ButtonWrapper>
  );
}

export default FilterActions;
