/*
  =========================================
  NOTE RENDERS FORM TO CREATE A NEW VACANCY
  =========================================
*/

import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

import {
  Container,
  Row,
  Col,
  Alert,
  Collapse,
  Button,
  Input,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  InputGroupAddon,
  InputGroup,
  CustomInput,
} from "reactstrap";

import Select from "react-select";

import { POST_JOB } from "../graphql/mutations";
import { JOB_CATEGORIES } from "../graphql/queries";

import { isEmptyStr } from "../helpers";

import "draft-js/dist/Draft.css";

// REACT SELECT CUSTOM STYLES
const customStyles = {
  control: provided => ({
    ...provided,
    borderRadius: 0,
    borderColor: "#ced4da",
    minHeight: "calc(1.5em + 0.75rem + 2px)",
    "&:hover": {
      borderColor: "#ced4da",
      cursor: "auto",
    },
  }),
  menu: provided => ({
    ...provided,
    borderRadius: 0,
  }),
  option: () => ({
    display: "inline-block",
    boxSizing: "border-box",
    padding: "0 8px",
    backgroundColor: "#f5f5f5",
    marginTop: "5px",
    marginLeft: "7px",
    borderRadius: "3px",
    cursor: "pointer",
    lineHeight: "36px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "14px",
  }),
  menuList: () => ({
    overflowY: "scroll",
    boxSizing: "border-box",
    maxHeight: "200px",
  }),
};

function VacancyForm({ history }) {
  const { authenticatedUser } = useContext(AuthContext);
  const jobCategoriesQueryStatus = useQuery(JOB_CATEGORIES);
  const [postJob, postJobStatus] = useMutation(POST_JOB, {
    onCompleted: onNewVacancy,
  });

  const [job, setJob] = useState({
    companyName: "",
    title: "",
    contactPhone: "",
    address: "",
    description: "",
    salaryFrom: "",
    salaryTo: "",
    noExperience: false,
    partTime: false,
    forTeens: false,
  });

  const [error, setError] = useState({
    type: undefined,
    msg: undefined,
  });

  const [jobCategories, setJobCategories] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (jobCategoriesQueryStatus.loading) {
      return;
    }

    onJobCategoriesFetch(jobCategoriesQueryStatus.data);
  }, [jobCategoriesQueryStatus]);

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setJob({ ...job, [name]: type === "checkbox" ? checked : value });
  }

  function handleJobSelect(selectedOption) {
    setJob({ ...job, title: selectedOption.label });
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();

    if (isEmptyStr(job.companyName)) {
      setError({
        type: "companyName",
        msg: "Please, provide company name",
      });
      return;
    }

    if (isEmptyStr(job.title)) {
      setError({
        type: "title",
        msg: "Please, provide job position",
      });
      return;
    }

    if (isEmptyStr(job.description) || job.description.length < 100) {
      setError({
        type: "description",
        msg: "Please, provide job description",
      });

      return;
    }

    if (isEmptyStr(job.address)) {
      setError({
        type: "address",
        msg: "Please, provide job address",
      });

      return;
    }

    if (isEmptyStr(job.salaryTo) || isEmptyStr(job.salaryFrom)) {
      setError({
        type: "slary",
        msg: "Please, provide full salary",
      });

      return;
    }

    let jobToPost = {
      ...job,
      salaryFrom: Number(job.salaryFrom),
      salaryTo: Number(job.salaryTo),
    };

    jobToPost.authorId = authenticatedUser.hashId;

    postJob({
      variables: jobToPost,
    });
  }

  function onJobCategoriesFetch(data) {
    const categories = data.jobCategories;
    const allSubCategories = [];

    for (let i = 0; i < categories.length; i++) {
      const currentCategory = categories[i];
      for (let j = 0; j < currentCategory.subCategories.length; j++) {
        allSubCategories.push({
          label: currentCategory.subCategories[j],
          value: currentCategory.subCategories[j],
        });
      }
    }

    setJobCategories(allSubCategories);
  }

  function onNewVacancy(data) {
    const hashId = data.postJob;

    setSubmitted(true);

    setTimeout(() => {
      history.push(`/vacancy/${hashId}`);
    }, 1000);
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="form-container mx-auto my-auto">
              <h3 className="mb-2">Create a Vacancy</h3>
              <Collapse isOpen={submitted}>
                <Alert color="success" className="mt-4 mb-4">
                  <p className="m-0">Redirecting to vacancy post...</p>
                </Alert>
              </Collapse>
              <Form onSubmit={handleSubmit} className="mt-4" autoComplete="off">
                <FormGroup>
                  <Label for="companyName">
                    Company Name <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={job.companyName}
                    invalid={error.type === "companyName"}
                    disabled={postJobStatus.loading}
                    onChange={handleChange}
                  />
                  <FormFeedback>{error.msg}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="jopPosition">
                    Job Position <FormFeedback tag="span">* </FormFeedback>
                    <span className="text-muted">
                      (Select job position from the list)
                    </span>
                  </Label>
                  <Select
                    id="jobPosition"
                    placeholder="Search job titles..."
                    name="title"
                    value={{ value: job.title, label: job.title }}
                    invalid={error.type === "title"}
                    disabled={postJobStatus.loading}
                    options={
                      jobCategoriesQueryStatus.loading || !jobCategories
                        ? []
                        : jobCategories
                    }
                    isLoading={
                      jobCategoriesQueryStatus.loading || !jobCategories
                    }
                    styles={customStyles}
                    onChange={handleJobSelect}
                  />
                  {error.type === "title" && (
                    <FormFeedback className="d-block">{error.msg}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="jobDescription">
                    Job Description <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <Input
                    id="jobDescription"
                    type="textarea"
                    placeholder="write your description"
                    className="new-vacancy-textarea"
                  />
                  <FormFeedback></FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="jobAddress">
                    Job Address <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <Input
                    id="jobAddress"
                    name="address"
                    invalid={error.type === "address"}
                    value={job.address}
                    disabled={postJobStatus.loading}
                    onChange={handleChange}
                    autoComplete="password-none"
                  />
                  <FormFeedback>{error.msg}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>
                    Salary <FormFeedback tag="span">*</FormFeedback>
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="from"
                      id="from"
                      name="salaryFrom"
                      value={job.salaryFrom}
                      invalid={error.type === "salary"}
                      disabled={postJobStatus.loading}
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      placeholder="to"
                      id="to"
                      name="salaryTo"
                      value={job.salaryTo}
                      invalid={error.type === "salary"}
                      disabled={postJobStatus.loading}
                      onChange={handleChange}
                    />
                    <FormFeedback>{error.msg}</FormFeedback>
                    <InputGroupAddon addonType="append">$ hour</InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Additional Terms</Label>

                  <CustomInput
                    type="checkbox"
                    name="partTime"
                    label="Part-time job"
                    id="partTime"
                    checked={job.partTime}
                    onChange={handleChange}
                  />
                  <CustomInput
                    type="checkbox"
                    name="forTeens"
                    label="Available for teens"
                    id="teen"
                    checked={job.teen}
                    onChange={handleChange}
                  />
                  <CustomInput
                    type="checkbox"
                    name="noExperience"
                    label="No experience required"
                    id="noExperience"
                    checked={job.noExperience}
                    onChange={handleChange}
                  />
                </FormGroup>

                <Button color="primary" className="mr-2 mt-2" type="submit">
                  Post the Job
                </Button>
                <Button className="mt-2">Cancel</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

VacancyForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default VacancyForm;
