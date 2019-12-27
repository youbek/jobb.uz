import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Label from "../../Form/Label";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import FilterActions from "../../JobsFeed/JobsFilter/FilterActions";

import GoogleAutoComplete from "../../GoogleAutoComplete";

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

function JobsFilter() {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  // CONTROLLING FILTER INPUTS LOCATION , RADIUS, CATEGORY
  const [jobFilter, setJobFilter] = useState({
    district: "",
    category: "",
    partTime: false,
    noExperience: false,
  });

  const [fetching, setFetching] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    setFetching(true);
  }, [jobFilter]);

  useEffect(() => {
    if (!fetching || firstLoad) return;

    setTimeout(() => {
      console.log("fetched");
      setFetching(false);
    }, 2000);
  }, [fetching]);

  function handleJobFilterChange(event) {
    const { name, value, checked, type } = event.target;
    setJobFilter({
      ...jobFilter,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
  }

  function handleResetFilter() {
    setJobFilter({
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
    setJobFilter({ ...jobFilter, district: selectedDistrict.value });
  }

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
            value={{ value: jobFilter.district, label: jobFilter.district }}
            options={districts}
            disabled={fetching}
            onChange={handleDistrictChange}
            styles={customStyles}
            isLoading={fetching}
          />
        </div>
        <div>
          <Label for="category">Категория</Label>
          <Select
            id="category"
            placeholder="Select a category"
            value={jobFilter.category}
            disabled={fetching}
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
              checked={jobFilter.partTime}
              onChange={handleJobFilterChange}
              disabled={fetching}
              id="partTime"
            />
            <Label for="partTime">Неполный рабочий день</Label>
          </div>
          <div className="mb-2">
            <CustomCheckbox
              name="noExperience"
              checked={jobFilter.noExperience}
              onChange={handleJobFilterChange}
              disabled={fetching}
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
