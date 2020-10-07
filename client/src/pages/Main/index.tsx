import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import JobCategories from "../components/JobsFeed/JobCategories/JobCategories";

import VacancyCategories from "./VacancyCategories";
import { VacancyFeed, Spinner, Container, Row, Col, Helmet } from "components";

import JobsFilter from "../components/JobsFeed/JobsFilter/JobsFilter";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Breadcrumb/BreadcrumbItem";
import JobsFeedContainer from "../components/JobsFeed/JobsFeedContainer";

import ScrollToTopButton from "../components/ScrollToTopButton";

import { LATEST_JOBS } from "graphql/queries/latestJobs";

import { createJobsFeedPageTitle } from "../helpers";

import { useJobFilter } from "hooks";

const StyledContainer = styled(Container)`
  display: block;
  min-height: calc(100vh - 260px);
`;

function JobsFeedPage() {
  const [jobReFilter, searchFilters, filters] = useJobFilter();

  const jobsQuery = useQuery(LATEST_JOBS, {
    variables: {
      options: filters,
    },
  });

  const [allJobFetched, setAllJobFetched] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const url = window.location.href;

  useEffect(() => {
    if (jobsQuery.loading) {
      return;
    }

    setAllJobFetched(false);
    jobsQuery.refetch({
      options: filters,
    });
  }, [filters]);

  useEffect(() => {
    if (!refetching || jobsQuery.loading) {
      return;
    }

    fetchMoreJobs();
  }, [refetching]);

  function fetchMoreJobs() {
    const lastJob =
      jobsQuery.data.getLatestJobs[jobsQuery.data.getLatestJobs.length - 1];

    jobsQuery.fetchMore({
      variables: {
        options: {
          cursor: lastJob && lastJob._id,
          ...filters,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setRefetching(false);

        if (!fetchMoreResult || !fetchMoreResult.getLatestJobs.length) {
          setAllJobFetched(true);
          return prev;
        }

        fetchMoreResult.getLatestJobs = [
          ...prev.getLatestJobs,
          ...fetchMoreResult.getLatestJobs,
        ];

        return fetchMoreResult;
      },
    });
  }

  return (
    <React.Fragment>
      <Helmet categoryName={filters.categoryName} />
      <Breadcrumb />

      <StyledContainer>
        {!searchFilters.categoryName && (
          <Row>
            <Col col12>
              <JobCategories />
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
    </React.Fragment>
  );
}

export default JobsFeedPage;
