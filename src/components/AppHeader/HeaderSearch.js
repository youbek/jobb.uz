import React from "react";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputGroup from "../Form/InputGroup";
import Input from "../Form/Input";
import Button from "../Buttons/Button";

const SearchIcon = styled(FontAwesomeIcon)`
  color: #222;
  position: absolute;
  z-index: 100;
  top: 13.5px;
  left: 10px;
`;

function HeaderSearch() {
  return (
    <InputGroup>
      <SearchIcon icon={faSearch} />
      <Input hasIcon width="350px" placeholder="Поиск работы" />
      <Button secondary className="ml-2">
        Найти
      </Button>
    </InputGroup>
  );
}
export default HeaderSearch;
