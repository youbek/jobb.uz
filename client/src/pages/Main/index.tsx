import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import VacancyCategories from "./VacancyCategories";
import { VacancyFeed, Spinner, Container, Row, Col, Helmet } from "components";

import JobsFilter from "../components/JobsFeed/JobsFilter/JobsFilter";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

import ScrollToTopButton from "../components/ScrollToTopButton";

import {
  LATEST_VACANCIES_RESULT,
  LATEST_VACANCIES_VARS,
  LATEST_VACANCIES,
} from "graphql/queries";

import { useJobFilter } from "hooks";

const StyledContainer = styled(Container)`
  display: block;
  min-height: calc(100vh - 260px);
`;

function JobsFeedPage() {
  const { loading, data, fetchMore } = useQuery<
    LATEST_VACANCIES_RESULT,
    LATEST_VACANCIES_VARS
  >(LATEST_VACANCIES);

  const [allJobFetched, setAllJobFetched] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    handleFetchMore();
  }, [loading]);

  function handleFetchMore() {
    if (!data) {
      return;
    }

    const lastVacancy = data.latestVacancies[data.latestVacancies.length - 1];

    fetchMore({
      variables: {
        options: {
          cursor: lastVacancy._id,
        },
      },
      updateQuery: (prev, {}) => {
        if (!latestVacancies) {
          return;
        }
      },
    });
  }

  return (
    <div>
      <Helmet categoryName={filters.categoryName} />
      <Breadcrumb />

      <StyledContainer>
        {!searchFilters.categoryName && (
          <Row>
            <Col col12>
              <VacancyCategories />
            </Col>
          </Row>
        )}

        <Row className="mt-4 pb-4">
          <Col col8>
            {filters.title &&
            jobsQuery.data &&
            jobsQuery.data.getLatestJobs.length ? (
              <div className="mb-2">
                {`Вакансии по запросу "${filters.title}"`}
              </div>
            ) : null}
            {jobsQuery.loading && <Spinner />}
            {jobsQuery.data !== undefined && !jobsQuery.loading && (
              <VacancyFeed
                jobs={jobsQuery.data.getLatestJobs}
                loading={refetching}
                setRefetching={!allJobFetched ? setRefetching : () => {}}
                searchTitle={filters.title}
              />
            )}
            {loading && jobs.length && (
              <Spinner size="12" color="#f64f64" className="mr-2" />
            )}
          </Col>
          <Col col4 className="d-none d-lg-block d-xl-block">
            <JobsFilter filters={searchFilters} loading={jobsQuery.loading} />
          </Col>
        </Row>
        <ScrollToTopButton />
      </StyledContainer>
    </div>
  );
}

export default JobsFeedPage;
