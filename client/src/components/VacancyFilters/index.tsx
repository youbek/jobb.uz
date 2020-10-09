import React, { useState } from "react";
import styled from "styled-components";
import "styled-components/macro";

import { useFilters, useWindowDimensions } from "hooks";

import { Input, Checkbox, Label, Button } from "components";

import ReactSelect, { Styles } from "react-select";

import { vacancyCategories } from "data";

// REACT SELECT CUSTOM STYLE
const customStyles: Styles = {
  control: (provided) => ({
    ...provided,
    borderColor: "#ced4da",
    minHeight: "45px",

    "&:hover": {
      borderColor: "#ced4da",
      cursor: "auto",
    },
  }),
};

const ActionsWrapper = styled.div`
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

interface Props {
  loading?: boolean;
  onSubmit?: () => void;
}

function VacancyFilters({ loading, onSubmit }: Props) {
  const { filters, setNewQuery, resetFilters } = useFilters();

  const { isMobile } = useWindowDimensions();

  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <form>
      {/* {isMobile && (
        <div css="margin-bottom: 1.5rem">
          <Label htmlFor="search">Поиск</Label>
          <Input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Поиск работы"
          />
        </div>
      )}
      <div css="margin-bottom: 1.5rem">
        <Label htmlFor="location">Район поиска</Label>
        <ReactSelect
          id="location"
          value={
            filters.district
              ? { value: filters.district, label: filters.district }
              : ""
          }
          options={districts}
          disabled={loading}
          onChange={handleDistrictChange}
          styles={customStyles}
          isLoading={loading}
          placeholder="Все районы"
        />
      </div>
      <div>
        <Label htmlFor="category">Категория</Label>
        <ReactSelect
          id="category"
          placeholder="Все категории"
          value={
            filters.category
              ? {
                  value: filters.category,
                  label: filters.category,
                }
              : undefined
          }
          options={vacancyCategories.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          styles={customStyles}
          disabled={loading}
          onChange={handleCategoryChange}
        />
      </div>
      <div css="margin-top: 1rem">
        <div css="margin-bottom: 0.5rem">
          <Checkbox
            name="partTime"
            checked={filters.partTime}
            onChange={handleJobFilterChange}
            disabled={loading}
            id="partTime"
          />
          <Label htmlFor="partTime">Неполный рабочий день</Label>
        </div>
        <div css="margin-bottom: 0.5rem">
          <Checkbox
            name="noExperience"
            checked={filters.noExperience}
            onChange={handleJobFilterChange}
            disabled={loading}
            id="noExperience"
          />
          <Label htmlFor="noExperience">Без опыта</Label>
        </div>
      </div>

      <ActionsWrapper>
        {isMobile && (
          <Button color="primary" onClick={handleFilterSubmit}>
            Поиск
          </Button>
        )}
        <Button color="outline" onClick={handleResetFilter}>
          Сбросить Фильтр
        </Button>
      </ActionsWrapper> */}
    </form>
  );
}

export default VacancyFilters;
