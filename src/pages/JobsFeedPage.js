import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import JobCategories from "../components/JobsFeed/JobCategories/JobCategories";
import JobsFeed from "../components/JobsFeed/JobsFeed";
import JobsFilter from "../components/JobsFeed/JobsFilter/JobsFilter";
import PopularJobTitles from "../components/JobsFeed/PopularJobTitles";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Breadcrumb/BreadcrumbItem";
import JobsFeedContainer from "../components/JobsFeed/JobsFeedContainer";
import { Row, Col } from "reactstrap";
import BreadcrumbContainer from "../components/Breadcrumb/BreadcrumbContainer";

import { GET_LATEST_JOBS, GET_POPULAR_JOB_TITLES } from "../graphql/queries";
import Spinner from "../components/Spinner/Spinner";

function JobsFeedPage({ categoryName, subCategoryName, currentUrl, match }) {
  const jobsQuery = useQuery(GET_LATEST_JOBS, {
    variables: {
      categoryName,
      subCategoryName,
    },
  });
  const getPopularJobTitlesQueryStatus = useQuery(GET_POPULAR_JOB_TITLES, {
    variables: {
      categoryName,
    },
  });

  const [allJobFetched, setAllJobFetched] = useState(false);
  const [refetching, setRefetching] = useState(false);

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
      categoryName,
      subCategoryName,
    });
  }, [categoryName, subCategoryName]);

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

    console.log(lastJob);

    jobsQuery.fetchMore({
      variables: {
        cursor: lastJob._id,
        categoryName,
        subCategoryName,
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
      <nav>
        <Breadcrumb>
          <BreadcrumbContainer>
            <BreadcrumbItem>Работа в Ташкенте</BreadcrumbItem>
            {categoryName && <BreadcrumbItem>{categoryName}</BreadcrumbItem>}
            {subCategoryName && (
              <BreadcrumbItem>{subCategoryName}</BreadcrumbItem>
            )}
          </BreadcrumbContainer>
        </Breadcrumb>
      </nav>

      <JobsFeedContainer>
        {!categoryName && (
          <Row>
            <Col md="12">
              <JobCategories />
            </Col>
          </Row>
        )}

        <Row className="jobsQuery.data-feed-page">
          <Col id="feed-page" lg="8">
            {categoryName && !subCategoryName && (
              <PopularJobTitles
                categoryName={categoryName}
                popularProfessions={
                  getPopularJobTitlesQueryStatus.data
                    ? getPopularJobTitlesQueryStatus.data.getPopularJobTitles
                    : []
                }
                currentUrl={currentUrl}
              />
            )}
            {jobsQuery.loading && <Spinner />}
            {jobsQuery.data !== undefined && (
              <JobsFeed
                jobs={jobsQuery.data.getLatestJobs}
                loading={refetching}
              />
            )}
          </Col>
          <Col md="4" className="d-none d-lg-block d-xl-block">
            <JobsFilter />
          </Col>
        </Row>
      </JobsFeedContainer>
    </React.Fragment>
  );
}

JobsFeedPage.propTypes = {
  categoryName: PropTypes.string,
  subCategoryName: PropTypes.string,
  currentUrl: PropTypes.string.isRequired,
};

export default JobsFeedPage;
