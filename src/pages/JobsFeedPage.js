import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import JobCategories from "../components/JobCategories";
import JobsFeed from "../components/JobsFeed";
import JobsFilter from "../components/JobsFilter";
import PopularJobTitles from "../components/PopularJobTitles";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import _ from "lodash";

import { Route } from "react-router-dom";

import { GET_LATEST_JOBS } from "../graphql/queries";

function JobsFeedPage() {
  const getLatestJobQuery = useQuery(GET_LATEST_JOBS, {
    variables: {
      limit: 2,
    },
  });

  const [jobs, setJobs] = useState(undefined);
  const [allJobFetched, setAllJobFetched] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", trackFeedBottom);

    return () => {
      document.removeEventListener("scroll", trackFeedBottom);
    };
  });

  useEffect(() => {
    if (getLatestJobQuery.error || getLatestJobQuery.loading) {
      return;
    }

    setJobs(getLatestJobQuery.data.getLatestJobs);
  }, [getLatestJobQuery]);

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

  function renderJobsFeed(match) {
    if (getLatestJobQuery.loading || jobs === undefined) {
      return null;
    }

    const categoryName = match.params.categoryName
      ? match.params.categoryName.replace(/-/g, " ").toLowerCase()
      : undefined;
    const popularJobTitles = match.params.popularJobTitles;
    const currentUrl = match.url;

    // RENDER JOBS FEED ACCORDING TO CATEGORIES
    if (categoryName && !popularJobTitles) {
      return (
        <React.Fragment>
          <PopularJobTitles
            categoryName={categoryName}
            popularProfessions={popularProfessions}
            currentUrl={currentUrl}
          />
          <JobsFeed
            jobs={jobs.filter(
              job => job.categoryName.toLowerCase() === categoryName,
            )}
          />
        </React.Fragment>
      );
    }

    // RENDER JOBS FEED ACCORDING TO POPULAR JOBS TITLES
    if (popularJobTitles) {
      return (
        <React.Fragment>
          <JobsFeed
            jobs={jobs.filter(
              job => job.title.toLowerCase() === popularJobTitles,
            )}
          />
        </React.Fragment>
      );
    }

    // RENDER JOBS FEED ACCORDING TO NOTHING (DEFAULT)
    return (
      <React.Fragment>
        <JobsFeed jobs={jobs} />
      </React.Fragment>
    );
  }

  function trackFeedBottom() {
    if (getLatestJobQuery.loading || allJobFetched) {
      return;
    }

    const feedEl = document.getElementById("feed-page");

    const bottomPoint = Math.floor(feedEl.getBoundingClientRect().bottom);
    const windowHeight = Math.floor(window.innerHeight);

    const isBottom = bottomPoint <= windowHeight;

    if (isBottom) {
      refetchJobs();
    }
  }

  function refetchJobs() {
    const lastJob = jobs[jobs.length - 1];

    getLatestJobQuery.fetchMore({
      variables: {
        offset: getLatestJobQuery.data.getLatestJobs.length,
        cursor: lastJob._id,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.getLatestJobs) {
          setAllJobFetched(true);
          return;
        }

        const newJobsList = [...jobs, ...fetchMoreResult.getLatestJobs];

        setJobs(newJobsList);
        return;
      },
    });
  }

  return (
    <React.Fragment>
      <Route
        // RENDER JOBS FEED ACCORDING TO CATEGORIES OR POPULAR JOB TITLES
        path="/:categoryName?/:popularJobTitles?"
        render={routerProps => {
          const categoryName = routerProps.match.params.categoryName;
          const popularJobTitles = routerProps.match.params.popularJobTitles;
          return (
            <React.Fragment>
              <Breadcrumb>
                <Container>
                  <Row>
                    <Col>
                      <BreadcrumbItem
                        active={!categoryName && !popularJobTitles}
                      >
                        New York
                      </BreadcrumbItem>
                      {categoryName && (
                        <BreadcrumbItem
                          active={categoryName && !popularJobTitles}
                        >
                          {_.startCase(_.toLower(categoryName))}
                        </BreadcrumbItem>
                      )}
                      {popularJobTitles && (
                        <BreadcrumbItem active={popularJobTitles}>
                          {_.startCase(_.toLower(popularJobTitles))}
                        </BreadcrumbItem>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Breadcrumb>
              <Container>
                {!categoryName && (
                  <Row>
                    <Col md="12">
                      <JobCategories />
                    </Col>
                  </Row>
                )}

                <Row className="jobs-feed-page">
                  <Col id="feed-page" md="8">
                    {renderJobsFeed(routerProps.match)}
                  </Col>
                  <Col md="4">
                    <JobsFilter />
                  </Col>
                </Row>
              </Container>
            </React.Fragment>
          );
        }}
      />
    </React.Fragment>
  );
}

export default JobsFeedPage;
