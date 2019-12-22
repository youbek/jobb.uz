import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Label from "../../Form/Label";
import Input from "../../Form/Input";
import Select from "../../Form/Select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import Button from "../../Buttons/Button";

import GoogleAutoComplete from "../../GoogleAutoComplete";

// STYLED COMPONENT
const SelectRadius = styled(Select)`
  width: 50%;
  border-left: hidden;
`;

function JobsFilter() {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  // CONTROLLING FILTER INPUTS LOCATION , RADIUS, CATEGORY
  const [jobFilter, setJobFilter] = useState({
    location: "",
    radius: "",
    category: "",
    partTime: false,
    seasonal: false,
    teen: false,
  });

  // ADDITIONAL FILTER OPTIONS SUCH AS PART-TIME AND TEEN
  const [filterCheckbox, setFilterCheckbox] = useState({
    partTime: false,
    seasonal: false,
    teen: false,
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

  function handlePlaceChange(place) {
    setJobFilter({ ...jobFilter, location: place });
  }

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
      location: "",
      radius: "",
      category: "",
      partTime: false,
      seasonal: false,
      teen: false,
    });
  }

  return (
    <div>
      <form>
        {isMobile && (
          <div className="mb-4">
            <Label for="search">Search</Label>
            <Input placeholder="Enter job title" />
          </div>
        )}
        <div className="mb-4">
          <Label for="location">Search Area</Label>
          <div className="filter-location">
            <GoogleAutoComplete
              fetching={fetching}
              handlePlaceChange={handlePlaceChange}
            />
            <SelectRadius
              left
              name="radius"
              value={jobFilter.radius}
              disabled={fetching}
              onChange={handleJobFilterChange}
            >
              <option value={jobFilter.radius}>5 miles</option>
              <option value={jobFilter.radius}>10 miles</option>
              <option value={jobFilter.radius}>20 miles</option>
              <option value={jobFilter.radius}>50 miles</option>
            </SelectRadius>
          </div>
        </div>
        <div>
          <Label for="category">Category</Label>
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
            <Label for="partTime">Part Time</Label>
          </div>
          <div className="mb-2">
            <CustomCheckbox
              name="seasonal"
              checked={jobFilter.seasonal}
              onChange={handleJobFilterChange}
              disabled={fetching}
              id="seasonal"
            />
            <Label for="seasonal">Seasonal</Label>
          </div>
          <div>
            <CustomCheckbox
              name="teen"
              checked={jobFilter.teen}
              onChange={handleJobFilterChange}
              disabled={fetching}
              id="teen"
            />
            <Label for="teen">Teen</Label>
          </div>
        </div>
        <Button
          secondary
          className={`mr-2 ${isMobile && "mt-4"}`}
          block={isMobile}
          onClick={handleFilterSubmit}
        >
          Apply
        </Button>
        <Button grey block={isMobile} onClick={handleResetFilter}>
          Reset Filter
        </Button>
      </form>
    </div>
  );
}

export default JobsFilter;
