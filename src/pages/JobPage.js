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

import { SocketContext } from "../context/SocketContext";
import { AppHeaderContext } from "../context/AppHeaderContext";

import { GET_JOB } from "../graphql/queries/index";
import JobAddressAndRecruiter from "../components/JobPage/JobAddressAndRecruiter";
import Spinner from "../components/Spinner/Spinner";
import JobPageSpinner from "../components/JobPage/JobPageSpinner";

function JobPage({ hashId }) {
  const getJobQuery = useQuery(GET_JOB, {
    variables: { hashId },
  });

  const [job, setJob] = useState(undefined);
  const { socket } = useContext(SocketContext);
  const { appHeaderState, setAppHeaderState } = useContext(AppHeaderContext);

  useEffect(() => {
    socket.on("userDisconnected", trackUserDisconnection);

    return () => socket.off("userDisconnected", trackUserDisconnection);
  }, []);

  useEffect(() => {
    if (getJobQuery.data) {
      setJob(getJobQuery.data.job);
      setAppHeaderState({
        ...appHeaderState,
        title: getJobQuery.data.job.title,
      });
    }
  }, [getJobQuery]);

  useEffect(() => {
    if (!job || "status" in job.author) {
      return;
    }

    socket.emit("checkUserOnlineStatus", job.author.hashId, status => {
      setJob({
        ...job,
        author: {
          ...job.author,
          status,
        },
      });
    });
  }, [job]);

  function trackUserDisconnection(disconnectedUserId) {
    if (job || disconnectedUserId !== job.author.hashId) {
      return;
    }

    setJob({
      ...job,
      author: {
        ...job.author,
        status: false,
      },
    });
  }

  if (getJobQuery.error) throw new Error(`Error ${getJobQuery.error.message}`);

  if (getJobQuery.loading || job === undefined) return <JobPageSpinner />;

  if (!getJobQuery.data || !getJobQuery.data.job) {
    return <Redirect to="/404" />;
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbContainer>
          <BreadcrumbItem>{<Link to="">New York</Link>}</BreadcrumbItem>
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
            location={`${job.address.lat},${job.address.long}`}
            address={job.address.name}
            recruiter={`${job.author.firstName} ${job.author.lastName}`}
            status={!job.author.status ? "false" : "true"}
          />
        </Row>
      </JobPageContainer>
    </React.Fragment>
  );
}

JobPage.propTypes = {
  hashId: PropTypes.string.isRequired,
};

export default JobPage;
