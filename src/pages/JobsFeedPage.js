import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import { SocketContext } from "../context/SocketContext";

import JobCategories from "../components/JobsFeed/JobCategories/JobCategories";
import JobsFeed from "../components/JobsFeed";
import JobsFilter from "../components/JobsFeed/JobsFilter/JobsFilter";
import PopularJobTitles from "../components/PopularJobTitles";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Breadcrumb/BreadcrumbItem";
import JobsFeedContainer from "../components/JobsFeed/JobsFeedContainer";
import { Row, Col } from "reactstrap";
import BreadcrumbContainer from "../components/Breadcrumb/BreadcrumbContainer";

import { GET_LATEST_JOBS, GET_POPULAR_JOB_TITLES } from "../graphql/queries";

function JobsFeedPage({ categoryName, subCategoryName, currentUrl }) {
  const getLatestJobQuery = useQuery(GET_LATEST_JOBS, {
    variables: {
      limit: 2,
      categoryName,
      subCategoryName,
    },
  });
  const getPopularJobTitlesQueryStatus = useQuery(GET_POPULAR_JOB_TITLES, {
    variables: {
      categoryName,
    },
  });

  const { socket } = useContext(SocketContext);

  const [jobs, setJobs] = useState(undefined);
  const [allJobFetched, setAllJobFetched] = useState(false);
  const [refetching, setRefetching] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", trackFeedBottom);
    socket.on("newJob", onNewJob);

    return () => {
      document.removeEventListener("scroll", trackFeedBottom);
      socket.off("newJob", onNewJob);
    };
  });

  useEffect(() => {
    if (getLatestJobQuery.error || getLatestJobQuery.loading) {
      return;
    }

    setJobs(getLatestJobQuery.data.getLatestJobs);
  }, [getLatestJobQuery]);

  useEffect(() => {
    refetchJobsByCategory();
  }, [categoryName, subCategoryName]);

  useEffect(() => {
    if (!refetching) {
      return;
    }

    refetchJobs();
  }, [refetching]);

  useEffect(() => {
    // CHECKING FOR
    // 1. INITIAL LOAD
    // 3. IT IS NOT REFETCHING SO INITIAL QUERY REQUEST
    if (!jobs || !refetching) {
      return;
    }

    setRefetching(false);
  }, [jobs, allJobFetched]);

  function trackFeedBottom() {
    if (getLatestJobQuery.loading || allJobFetched || refetching) {
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
    const lastJob = jobs[jobs.length - 1];

    getLatestJobQuery.fetchMore({
      variables: {
        cursor: lastJob._id,
        categoryName,
        subCategoryName,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.getLatestJobs.length) {
          setAllJobFetched(true);
          return;
        }

        const newJobsList = [...jobs, ...fetchMoreResult.getLatestJobs];

        setJobs(newJobsList);
        return;
      },
    });
  }

  function refetchJobsByCategory() {
    if (getLatestJobQuery.loading) {
      return;
    }

    getLatestJobQuery.fetchMore({
      variables: {
        limit: 2,
        categoryName,
        subCategoryName,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setJobs(fetchMoreResult.getLatestJobs);
        return;
      },
    });

    getPopularJobTitlesQueryStatus.fetchMore({
      variables: {
        categoryName,
      },
    });
  }

  function onNewJob(job) {
    if (categoryName && categoryName !== job.category) {
      return;
    }

    if (subCategoryName && subCategoryName !== job.title) {
      return;
    }

    setJobs([job, ...jobs]);
  }

  console.log(getPopularJobTitlesQueryStatus.data);

  return (
    <React.Fragment>
      <nav>
        <Breadcrumb>
          <BreadcrumbContainer>
            <BreadcrumbItem>New York</BreadcrumbItem>
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

        <Row className="jobs-feed-page">
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
            {jobs !== undefined && (
              <JobsFeed jobs={jobs} loading={refetching} />
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
