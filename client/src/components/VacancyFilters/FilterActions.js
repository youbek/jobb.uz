import React from "react";
import styled from "styled-components";
import Button from "../../Buttons/Button";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${Button} {
    flex-grow: 1;
    padding-left: 1rem;
    padding-right: 1rem;

    &:first-child {
      margin-bottom: 10px;
    }
  }
`;

function FilterActions({ isMobile, handleResetFilter, handleFilterSubmit }) {
  return (
    <ButtonWrapper>
      <Button block={isMobile} onClick={handleFilterSubmit}>
        Поиск
      </Button>
      <Button grey block={isMobile} onClick={handleResetFilter}>
        Сбросить Фильтр
      </Button>
    </ButtonWrapper>
  );
}

export default FilterActions;
