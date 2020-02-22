import React, { useState } from "react";
import styled from "styled-components";

import { useJobFilter } from "hooks";

import { Button, InputGroup, Input } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchIcon = styled(FontAwesomeIcon)`
  color: #222;
  position: absolute;
  z-index: 1000;
  top: 13.5px;
  left: 10px;
`;

function HeaderSearch() {
  const [jobReFilter] = useJobFilter();
  const [placeholder, setPlaceholder] = useState("Поиск работы");
  const [searchKeyword, setSearchKeyword] = useState("");

  function onSearch(e) {
    e.preventDefault();

    const filter = {
      title: searchKeyword,
    };

    jobReFilter(filter, true);
  }

  return (
    <form onSubmit={onSearch}>
      <InputGroup>
        <SearchIcon icon={faSearch} />
        <Input
          hasIcon
          width="350px"
          placeholder={placeholder}
          value={searchKeyword}
          onFocus={() => setPlaceholder("Введите профессию или компанию")}
          onBlur={() => setPlaceholder("Поиск работы")}
          onChange={e => setSearchKeyword(e.target.value)}
        />
        <Button secondary className="ml-2">
          Найти
        </Button>
      </InputGroup>
    </form>
  );
}
export default HeaderSearch;
