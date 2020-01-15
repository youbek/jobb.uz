import React, { useState } from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "../Form/InputGroup";
import Input from "../Form/Input";
import Button from "../Buttons/Button";

import { useJobFilter } from "hooks";

const SearchIcon = styled(FontAwesomeIcon)`
  color: #222;
  position: absolute;
  z-index: 100;
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
