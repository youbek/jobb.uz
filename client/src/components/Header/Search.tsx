import React, { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";

import { useFilters, useWindowDimensions } from "hooks";

import Button from "components/Button";
import Input from "components/Form/Input";
import Overlay from "components/Overlay";
import VacancyFilters from "components/VacancyFilters";

import { ReactComponent as SearchIcon } from "icons/search.svg";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;

  svg {
    color: #222;
    position: absolute;
    z-index: 1000;
    top: 9.5px;
    left: 10px;
  }
`;

const SearchInput = styled(Input)`
  width: 350px;
  padding-left: 2.5rem;
`;

const SearchIconButton = styled.button`
  color: #e2e2e2;
`;

function Search() {
  const { isMobile } = useWindowDimensions();
  const [isOverlayForm, showOverlayForm] = useState(false);
  const { setNewQuery } = useFilters();
  const [placeholder, setPlaceholder] = useState("Поиск работы");
  const [searchKeyword, setSearchKeyword] = useState("");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const filter = {
      title: searchKeyword,
    };

    setNewQuery(filter);
  }

  function toggleOverlayForm() {
    showOverlayForm((state) => !state);
  }

  if (isMobile) {
    if (isOverlayForm) {
      return (
        <Overlay
          isOpen={isOverlayForm}
          toggle={toggleOverlayForm}
          title="Поиск работы"
        >
          <VacancyFilters onSubmit={toggleOverlayForm} />
        </Overlay>
      );
    }

    return (
      <SearchIconButton onClick={toggleOverlayForm}>
        <SearchIcon />
      </SearchIconButton>
    );
  }

  return (
    <form onSubmit={handleSearch}>
      <Wrapper>
        <SearchIcon />
        <SearchInput
          placeholder={placeholder}
          value={searchKeyword}
          onFocus={() => setPlaceholder("Введите профессию или компанию")}
          onBlur={() => setPlaceholder("Поиск работы")}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button type="submit" color="secondary" css="margin-left: 0.5rem">
          Найти
        </Button>
      </Wrapper>
    </form>
  );
}
export default Search;
