import React, { useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import { Breadcrumb } from "components";

import JobInfo from "../components/JobPage/JobInfo";
import JobPageContainer from "../components/JobPage/JobPageContainer";
import JobAddressAndRecruiter from "../components/JobPage/JobAddressAndRecruiter";
import JobPageSpinner from "../components/JobPage/JobPageSpinner";

import SimilarJobsFeed from "../components/JobsFeed/SimilarJobsFeed";

import Row from "../components/Layout/Row";

import { JOB } from "../graphql/queries/index";

import { formatCityName, createSEOVacancyScript } from "../helpers";
import { createJobPageTitle } from "../helpers";

interface Props {
  hashId: string;
}

function JobPage({ hashId }: Props) {
  const getJobQuery = useQuery(GET_JOB, {
    variables: { hashId },
  });

  const url = window.location.href;

  if (getJobQuery.error) throw new Error(`Error ${getJobQuery.error.message}`);

  if (getJobQuery.loading) return <JobPageSpinner />;

  if (!getJobQuery.data || !getJobQuery.data.job) {
    return <Redirect to="/404" />;
  }

  const { job } = getJobQuery.data;

  return (
    <React.Fragment>
      <Helmet>
        <title> {createJobPageTitle(job.title, job.companyName)} </title>
        <script type="application/ld+json">
          {createSEOVacancyScript(job)}
        </script>
        <link rel="canonical" href={url} />
      </Helmet>
      <Breadcrumb categoryName={job.category} />

      <JobPageContainer>
        <Row>
          <JobInfo job={job} />
          <JobAddressAndRecruiter
            location={
              job.address.lat && job.address.long
                ? `${job.address.lat},${job.address.long}`
                : job.address.name
            }
            address={formatCityName(job.address.name)}
          />
        </Row>
        <Row>
          <SimilarJobsFeed similarJobs={job.similarJobs} />
        </Row>
      </JobPageContainer>
    </React.Fragment>
  );
}

JobPage.propTypes = {
  hashId: PropTypes.string.isRequired,
};

export default JobPage;
