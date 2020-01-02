import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import JobInfo from "../components/JobPage/JobInfo";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BreadcrumbContainer from "../components/Breadcrumb/BreadcrumbContainer";
import BreadcrumbItem from "../components/Breadcrumb/BreadcrumbItem";
import JobPageContainer from "../components/JobPage/JobPageContainer";
import Row from "../components/Layout/Row";

import SimilarJobsFeed from "../components/JobsFeed/SimilarJobsFeed";

import { AppHeaderContext } from "../context/AppHeaderContext";

import { GET_JOB } from "../graphql/queries/index";
import JobAddressAndRecruiter from "../components/JobPage/JobAddressAndRecruiter";
import JobPageSpinner from "../components/JobPage/JobPageSpinner";

function JobPage({ hashId }) {
  const getJobQuery = useQuery(GET_JOB, {
    variables: { hashId },
  });

  const [job, setJob] = useState(undefined);

  const { appHeaderState, setAppHeaderState } = useContext(AppHeaderContext);

  useEffect(() => {
    if (getJobQuery.data) {
      setJob(getJobQuery.data.job);
      setAppHeaderState({
        ...appHeaderState,
        title: getJobQuery.data.job.title,
      });
    }
  }, [getJobQuery]);

  if (getJobQuery.error) throw new Error(`Error ${getJobQuery.error.message}`);

  if (getJobQuery.loading || job === undefined) return <JobPageSpinner />;

  if (!getJobQuery.data || !getJobQuery.data.job) {
    return <Redirect to="/404" />;
  }

  const similarJobs = [];

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbContainer>
          <BreadcrumbItem>
            {<Link to="">Работа в Ташкенте</Link>}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {
              <Link to={`/${job.category.replace(/\s+/g, "-").toLowerCase()}`}>
                {job.category}
              </Link>
            }
          </BreadcrumbItem>
        </BreadcrumbContainer>
      </Breadcrumb>
      <JobPageContainer>
        <Row>
          <JobInfo job={job} />
          <JobAddressAndRecruiter
            location={
              job.address.lat && job.address.long
                ? `${job.address.lat},${job.address.long}`
                : "41.311081, 69.240562"
            }
            address={job.address.name}
          />
        </Row>
        <Row>
          <SimilarJobsFeed similarJobs={similarJobs} />
        </Row>
      </JobPageContainer>
    </React.Fragment>
  );
}

JobPage.propTypes = {
  hashId: PropTypes.string.isRequired,
};

export default JobPage;
