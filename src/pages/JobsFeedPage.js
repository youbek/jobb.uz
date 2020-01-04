import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

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

function JobsFeedPage({ searchFilters, redirect }) {
  const jobsQuery = useQuery(GET_LATEST_JOBS, {
    variables: {
      options: searchFilters,
    },
  });

  const [allJobFetched, setAllJobFetched] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const url = window.location.href;

  useEffect(() => {
    document.addEventListener("scroll", trackFeedBottom);

    return () => {
      document.removeEventListener("scroll", trackFeedBottom);
    };
  });

  useEffect(() => {
    if (jobsQuery.loading || !jobsQuery.data) {
      return;
    }

    jobsQuery.refetch({
      options: searchFilters,
    });
  }, [searchFilters]);

  useEffect(() => {
    if (!refetching) {
      return;
    }

    refetchJobs();
  }, [refetching]);

  function trackFeedBottom() {
    if (jobsQuery.loading || allJobFetched || refetching) {
      return;
    }

    const feedEl = document.getElementById("feed-page");

    const bottomPoint = Math.floor(feedEl.getBoundingClientRect().bottom);
    const windowHeight = Math.floor(window.innerHeight);

    const isBottom = bottomPoint <= windowHeight;

    if (isBottom) {
      setRefetching(true);
    }
  }

  function refetchJobs() {
    const lastJob =
      jobsQuery.data.getLatestJobs[jobsQuery.data.getLatestJobs.length - 1];

    jobsQuery.fetchMore({
      variables: {
        options: {
          cursor: lastJob && lastJob._id,
          ...searchFilters,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setRefetching(false);

        if (!fetchMoreResult || !fetchMoreResult.getLatestJobs.length) {
          setAllJobFetched(true);
          return;
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
              <BreadcrumbItem>{searchFilters.categoryName}</BreadcrumbItem>
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
              <JobCategories redirect={redirect} />
            </Col>
          </Row>
        )}

        <Row className="jobs-feed-page">
          <Col id="feed-page" lg="8">
            {jobsQuery.loading && <Spinner />}
            {jobsQuery.data !== undefined && !jobsQuery.loading && (
              <JobsFeed
                jobs={jobsQuery.data.getLatestJobs}
                loading={refetching}
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

JobsFeedPage.propTypes = {
  searchFilters: PropTypes.shape({
    categoryName: PropTypes.string,
    subCategoryName: PropTypes.string,
    district: PropTypes.string,
    partTime: PropTypes.bool,
    noExperience: PropTypes.bool,
  }),
};

export default JobsFeedPage;
