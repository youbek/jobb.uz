import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Form, Input, Label, FormGroup, CustomInput, Button } from "reactstrap";
import GoogleAutoComplete from "./GoogleAutoComplete";

function JobsFilter() {
  const isMobile = useMediaQuery({ query: "(max-device-width: 767px )" });
  // CONTROLLING FILTER INPUTS LOCATION, RADIUS, CATEGORY
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
    <div className="jobs-filter">
      <Form>
        {isMobile && (
          <FormGroup className="mb-4">
            <Label className="font-weight-bold" for="search">
              Search
            </Label>
            <Input type="text" placeholder="Enter job title" />
          </FormGroup>
        )}
        <FormGroup className="mb-4">
          <Label className="font-weight-bold" for="location">
            Search Area
          </Label>
          <div className="filter-location">
            <GoogleAutoComplete
              fetching={fetching}
              handlePlaceChange={handlePlaceChange}
            />
            <Input
              className="filter-location-radius"
              type="select"
              name="radius"
              value={jobFilter.radius}
              disabled={fetching}
              onChange={handleJobFilterChange}
            >
              <option value={jobFilter.radius}>5 miles</option>
              <option value={jobFilter.radius}>10 miles</option>
              <option value={jobFilter.radius}>20 miles</option>
              <option value={jobFilter.radius}>50 miles</option>
            </Input>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="category" className="font-weight-bold">
            Category
          </Label>
          <Input
            id="category"
            placeholder="Select a category"
            value={jobFilter.category}
            disabled={fetching}
            type="select"
            onChange={handleJobFilterChange}
          >
            <option></option>
          </Input>
        </FormGroup>
        <FormGroup>
          <CustomInput
            className="mb-2"
            type="checkbox"
            name="partTime"
            checked={jobFilter.partTime}
            label="Part-time"
            onChange={handleJobFilterChange}
            disabled={fetching}
            id="partTime"
          />
          <CustomInput
            className="mb-2"
            type="checkbox"
            name="seasonal"
            checked={jobFilter.seasonal}
            label="Seasonal"
            onChange={handleJobFilterChange}
            disabled={fetching}
            id="seasonal"
          />
          <CustomInput
            type="checkbox"
            name="teen"
            checked={jobFilter.teen}
            label="Teen"
            onChange={handleJobFilterChange}
            disabled={fetching}
            id="teen"
          />
        </FormGroup>
        <Button
          color="success"
          className={`mr-2 ${isMobile && "mt-4"}`}
          block={isMobile}
          onClick={handleFilterSubmit}
        >
          Apply
        </Button>
        <Button color="secondary" block={isMobile} onClick={handleResetFilter}>
          Reset Filter
        </Button>
      </Form>
    </div>
  );
}

export default JobsFilter;
