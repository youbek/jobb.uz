import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import { SocketContext } from "../context/SocketContext";

import JobCategories from "../components/JobCategories";
import JobsFeed from "../components/JobsFeed";
import JobsFilter from "../components/JobsFilter";
import PopularJobTitles from "../components/PopularJobTitles";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

import { GET_LATEST_JOBS } from "../graphql/queries";
import AppHeader from "../components/AppHeader/AppHeader";

function JobsFeedPage({ categoryName, subCategoryName, currentUrl }) {
  const getLatestJobQuery = useQuery(GET_LATEST_JOBS, {
    variables: {
      limit: 2,
      categoryName,
      subCategoryName,
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

  const popularProfessions = [
    {
      id: 1,
      title: "driver",
    },
    {
      id: 2,
      title: "engineer",
    },
    {
      id: 3,
      title: "clerk",
    },
    {
      id: 4,
      title: "cashier",
    },
    {
      id: 5,
      title: "salesperson",
    },
    {
      id: 6,
      title: "manager",
    },
  ];

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

  return (
    <React.Fragment>
      <Breadcrumb>
        <Container>
          <Row>
            <Col>
              <BreadcrumbItem active={!categoryName && !subCategoryName}>
                New York
              </BreadcrumbItem>
              {categoryName && (
                <BreadcrumbItem active={categoryName && !subCategoryName}>
                  {categoryName}
                </BreadcrumbItem>
              )}
              {subCategoryName && (
                <BreadcrumbItem active={subCategoryName}>
                  {subCategoryName}
                </BreadcrumbItem>
              )}
            </Col>
          </Row>
        </Container>
      </Breadcrumb>
      <Container className='jobs-feed-wrapper"'>
        {!categoryName && (
          <Row>
            <Col md="12">
              <JobCategories />
            </Col>
          </Row>
        )}

        <Row className="jobs-feed-page">
          <Col id="feed-page" md="8">
            {categoryName && !subCategoryName && (
              <PopularJobTitles
                categoryName={categoryName}
                popularProfessions={popularProfessions}
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
      </Container>
    </React.Fragment>
  );
}

JobsFeedPage.propTypes = {
  categoryName: PropTypes.string,
  subCategoryName: PropTypes.string,
  currentUrl: PropTypes.string.isRequired,
};

export default JobsFeedPage;
