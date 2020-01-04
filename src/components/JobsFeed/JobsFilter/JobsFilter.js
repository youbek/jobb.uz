import React from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import Label from "../../Form/Label";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import FilterActions from "../../JobsFeed/JobsFilter/FilterActions";

import { default as ReactSelect } from "react-select";

import { useJobFilter } from "../../../hooks";

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

function JobsFilter({ filters, loading }) {
  const jobReFilter = useJobFilter();
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });

  function handleJobFilterChange(event) {
    const { name, value, checked, type } = event.target;
    const newFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };

    jobReFilter(newFilters);
  }

  function handleDistrictChange(selectedDistrict) {
    jobReFilter({ ...filters, district: selectedDistrict.value });
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
  }

  function handleResetFilter() {
    debugger;
    jobReFilter();
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

  return (
    <div>
      <form>
        {isMobile && (
          <div className="mb-4">
            <Label htmlFor="search">Поиск</Label>
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
            value={!filters.categoryName ? "" : filters.categoryName}
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

JobsFilter.propTypes = {
  filters: PropTypes.shape({
    categoryName: PropTypes.string,
    district: PropTypes.string,
    partTime: PropTypes.bool,
    noExperience: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default JobsFilter;
