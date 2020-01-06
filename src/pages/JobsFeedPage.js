import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import JobCategories from "../components/JobsFeed/JobCategories/JobCategories";
import JobsFeed from "../components/JobsFeed/JobsFeed";
import JobsFilter from "../components/JobsFeed/JobsFilter/JobsFilter";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Breadcrumb/BreadcrumbItem";
import JobsFeedContainer from "../components/JobsFeed/JobsFeedContainer";
import { Row, Col } from "reactstrap";
import BreadcrumbContainer from "../components/Breadcrumb/BreadcrumbContainer";

import { GET_LATEST_JOBS } from "../graphql/queries";
import Spinner from "../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { createJobsFeedPageTitle } from "../helpers";

import { useJobFilter } from "hooks";

function JobsFeedPage() {
  const [jobReFilter, searchFilters, filters] = useJobFilter();

  const jobsQuery = useQuery(GET_LATEST_JOBS, {
    variables: {
      options: filters,
    },
  });

  const [allJobFetched, setAllJobFetched] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const url = window.location.href;

  useEffect(() => {
    if (jobsQuery.loading || !jobsQuery.data) {
      return;
    }
    setAllJobFetched(false);
    jobsQuery.refetch({
      options: filters,
    });
  }, [searchFilters]);

  useEffect(() => {
    console.log(refetching);
    if (!refetching) {
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
      <Helmet>
        <title>
          {createJobsFeedPageTitle(
            searchFilters.categoryName,
            searchFilters.subCategoryName,
          )}
        </title>
        <link rel="canonical" href={url} />
      </Helmet>
      <nav>
        <Breadcrumb>
          <BreadcrumbContainer>
            <BreadcrumbItem>Работа в Ташкенте</BreadcrumbItem>
            {searchFilters.categoryName && (
              <BreadcrumbItem>{filters.categoryName}</BreadcrumbItem>
            )}
            {searchFilters.subCategoryName && (
              <BreadcrumbItem>{searchFilters.subCategoryName}</BreadcrumbItem>
            )}
          </BreadcrumbContainer>
        </Breadcrumb>
      </nav>

      <JobsFeedContainer>
        {!searchFilters.categoryName && (
          <Row>
            <Col md="12">
              <JobCategories />
            </Col>
          </Row>
        )}

        <Row className="jobs-feed-page pb-4">
          <Col id="feed-page" lg="8">
            {jobsQuery.loading && <Spinner />}
            {jobsQuery.data !== undefined && !jobsQuery.loading && (
              <JobsFeed
                jobs={jobsQuery.data.getLatestJobs}
                loading={refetching}
                setRefetching={!allJobFetched ? setRefetching : () => {}}
              />
            )}
          </Col>
          <Col md="4" className="d-none d-lg-block d-xl-block">
            <JobsFilter filters={searchFilters} loading={jobsQuery.loading} />
          </Col>
        </Row>
      </JobsFeedContainer>
    </React.Fragment>
  );
}

export default JobsFeedPage;
