import React from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import Label from "../../Form/Label";
import Input from "../../Form/Input";
import CustomCheckbox from "../../Form/CustomCheckbox";
import FilterActions from "../../JobsFeed/JobsFilter/FilterActions";

import { default as ReactSelect } from "react-select";

import { useJobFilter } from "hooks";

import { jobCategories } from "constants/index";

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
  const [jobReFilter] = useJobFilter();
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

  function handleCategoryChange(newCategory) {
    jobReFilter({ ...filters, categoryName: newCategory.value });
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
  }

  function handleResetFilter(e) {
    e.preventDefault();
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

  const selectedCategory = filters.categoryName
    ? jobCategories.find(
        category => category.transliteratedName === filters.categoryName,
      )
    : undefined;

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
              selectedCategory
                ? {
                    value: selectedCategory.transliteratedName,
                    label: selectedCategory.name,
                  }
                : undefined
            }
            options={jobCategories.map(category => ({
              value: category.transliteratedName,
              label: category.name,
            }))}
            styles={customStyles}
            disabled={loading}
            onChange={handleCategoryChange}
          />
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
            <Label htmlFor="partTime">Неполный рабочий день</Label>
          </div>
          <div className="mb-2">
            <CustomCheckbox
              name="noExperience"
              checked={filters.noExperience}
              onChange={handleJobFilterChange}
              disabled={loading}
              id="noExperience"
            />
            <Label htmlFor="noExperience">Без опыта</Label>
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
