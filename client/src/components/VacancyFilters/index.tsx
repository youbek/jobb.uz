import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import "styled-components/macro";

import { useFilters, useWindowDimensions } from "hooks";

import { Input, Checkbox, Label } from "components";
import Button from 'components/Button'

import ReactSelect, { Styles, ValueType } from "react-select";

import { vacancyCategories, districts } from "data";


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
`;

interface Props {
  loading?: boolean;
  onSubmit?: () => void;
}

function VacancyFilters({ loading, onSubmit }: Props) {
  const { filters, setNewQuery, resetFilters } = useFilters();
  const { isMobile } = useWindowDimensions();
  const [searchKeyword, setSearchKeyword] = useState("");

  // selected param is any because of mess typing of react-select
  function handleSelectChange(selected: any, name: 'district' | 'category') {
    if (!selected) {
      return;
    }

    const {  value } = selected;

    setNewQuery({ ...filters, [name]: value });
  }

  function handleCheckboxChange() {}

  return (
    <form>
      {isMobile && (
        <div css="margin-bottom: 1.5rem">
          <Label htmlFor="search">Поиск</Label>
          <Input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Поиск работы"
          />
        </div>
      )}
      <div  css="margin-bottom: 1.5rem">
        <Label htmlFor="district">Район поиска</Label>
        <ReactSelect
          id="district"
          value={
            filters.district
              ? { value: filters.district, label: filters.district }
              : null
          }
          options={districts}
          disabled={loading}
          onChange={(selected) => handleSelectChange(selected, 'district')}
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
          name="category"
          value={
            filters.category
              ? {
                  value: filters.category,
                  label: filters.category,
                }
              : null
          }
          options={vacancyCategories.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          styles={customStyles}
          disabled={loading}
          onChange={(selected) => handleSelectChange(selected, 'category')}
        />
      </div>
      <div css="margin-top: 1rem">
        <div css="margin-bottom: 0.5rem">
          <Checkbox
            id="partTime"
            name="partTime"
            checked={filters.partTime}
            disabled={loading}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="partTime">Неполный рабочий день</Label>
        </div>
        <div css="margin-bottom: 0.5rem">
          <Checkbox
            id="noExperience"
            name="noExperience"
            checked={filters.noExperience}
            disabled={loading}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="noExperience">Без опыта</Label>
        </div>
        <div css="margin-bottom: 0.5rem">
          <Checkbox
            id="remote"
            name="remote"
            checked={filters.noExperience}
            disabled={loading}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="remote">Удаленная работа</Label>
        </div>
      </div>
      <ActionsWrapper>
        {isMobile && (
          <Button color="primary" onClick={onSubmit} css="margin-bottom: 0.75rem">
            Поиск
          </Button>
        )}
        <Button  color="outline" onClick={resetFilters}>
          Сбросить Фильтр
        </Button>   
      </ActionsWrapper>
    </form>
  );
}

export default VacancyFilters;
