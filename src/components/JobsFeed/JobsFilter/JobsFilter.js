import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Label from "../../Form/Label";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import FilterActions from "../../JobsFeed/JobsFilter/FilterActions";

import { default as ReactSelect } from "react-select";

// REACT SELECT CUSTOM STYLE
const customStyles = {
  control: provided => ({
    ...provided,
    borderColor: "#ced4da",
    minHeight: "45px",
    "&:hover": {
      borderColor: "#ced4da",
      cursor: "auto",
    },
  }),
};

function JobsFilter({ filters, setFilters, loading }) {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  // CONTROLLING FILTER INPUTS LOCATION , RADIUS, CATEGORY

  function handleJobFilterChange(event) {
    const { name, value, checked, type } = event.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
  }

  function handleResetFilter() {
    setFilters({
      district: "",
      category: "",
      partTime: false,
      noExperience: false,
    });
  }

  const districts = [
    { value: "Алмазарский район", label: "Алмазарский район" },
    { value: "Бектемирский район", label: "Бектемирский район" },
    { value: "Мирабадский район", label: "Мирабадский район" },
    { value: "Мирзо-Улугбекский район", label: "Мирзо-Улугбекский район" },
    { value: "Сергелийский район", label: "Сергелийский район" },
    { value: "Учтепинский район", label: "Учтепинский район" },
    { value: "Чиланзарский район", label: "Чиланзарский район" },
    { value: "Шайхантахурский район", label: "Шайхантахурский район" },
    { value: "Юнусабадский район", label: "Юнусабадский район" },
    { value: "Яккасарайский район", label: "Яккасарайский район" },
    { value: "Яшнабадский район", label: "Яшнабадский район" },
  ];

  function handleDistrictChange(selectedDistrict) {
    setFilters({ ...filters, district: selectedDistrict.value });
  }

  console.log(filters);

  return (
    <div>
      <form>
        {isMobile && (
          <div className="mb-4">
            <Label for="search">Поиск</Label>
            <Input placeholder="Enter job title" />
          </div>
        )}
        <div className="mb-4">
          <Label for="location">Район поиска</Label>
          <ReactSelect
            id="location"
            placeholder="Введите район поиска"
            name="jobDistrict"
            value={{ value: filters.district, label: filters.district }}
            options={districts}
            disabled={loading}
            onChange={handleDistrictChange}
            styles={customStyles}
            isLoading={loading}
          />
        </div>
        <div>
          <Label for="category">Категория</Label>
          <Select
            id="category"
            placeholder="Select a category"
            value={filters.category}
            disabled={loading}
            type="select"
            onChange={handleJobFilterChange}
          >
            <option></option>
          </Select>
        </div>
        <div className="mt-3">
          <div className="mb-2">
            <CustomCheckbox
              name="partTime"
              checked={filters.partTime}
              onChange={handleJobFilterChange}
              disabled={loading}
              id="partTime"
            />
            <Label for="partTime">Неполный рабочий день</Label>
          </div>
          <div className="mb-2">
            <CustomCheckbox
              name="noExperience"
              checked={filters.noExperience}
              onChange={handleJobFilterChange}
              disabled={loading}
              id="noExperience"
            />
            <Label for="noExperience">Без опыта</Label>
          </div>
        </div>
        <FilterActions
          isMobile={isMobile}
          handleResetFilter={handleResetFilter}
          handleFilterSubmit={handleFilterSubmit}
        />
      </form>
    </div>
  );
}

export default JobsFilter;
