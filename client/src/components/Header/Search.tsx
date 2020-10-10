import React, { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";

import { useFilters, useWindowDimensions } from "hooks";

import Button from "components/Button";
import Input from "components/Form/Input";
import Overlay from "components/Overlay";
import VacancyFilters from "components/VacancyFilters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

const SearchInput = styled(Input)`
  width: 350px;
  padding-left: 2.5rem;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #222;
  position: absolute;
  z-index: 1000;
  top: 13.5px;
  left: 10px;
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
      <button onClick={toggleOverlayForm}>
        <FontAwesomeIcon icon={faSearch} color="#fff" />
      </button>
    );
  }

  return (
    <form onSubmit={handleSearch}>
      <Wrapper>
        <SearchIcon icon={faSearch} />
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
