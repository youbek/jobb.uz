import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import JobInfo from "../components/JobInfo";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { Breadcrumb, BreadcrumbItem, Container, Row, Col } from "reactstrap";

import { SocketContext } from "../context/SocketContext";
import { AppHeaderContext } from "../context/AppHeaderContext";

import { GET_JOB } from "../graphql/queries/index";

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

  if (getJobQuery.loading || job === undefined) return <div></div>;

  if (!getJobQuery.data || !getJobQuery.data.job) {
    return <Redirect to="/404" />;
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Container>
          <BreadcrumbItem>{<Link to="">New York</Link>}</BreadcrumbItem>
          <BreadcrumbItem>{<Link to="">{job.category}</Link>}</BreadcrumbItem>
        </Container>
      </Breadcrumb>
      <Container className="full-container">
        <Row>
          <Col md="8">
            <JobInfo job={job} />
          </Col>
          <Col
            md="4"
            className="address-and-employer-details d-none d-xl-block"
          >
            <div className="job-location ml-2">
              <div className="job-location-map">
                <StaticGoogleMap
                  size="300x120"
                  apiKey="AIzaSyATyzWeCcSuG_szpR2IjHm79kq9YcSUQh0"
                >
                  <Marker location={`${job.address.lat},${job.address.long}`} />
                </StaticGoogleMap>
                <div className="job-location-address mt-2">
                  Address<p>{job.address.name}</p>
                </div>
              </div>
              <div className="employer-details">
                Recruiter
                <p>
                  {`${job.author.firstName} ${job.author.lastName}`}{" "}
                  <span status={!job.author.status ? "false" : "true"}></span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

JobPage.propTypes = {
  hashId: PropTypes.string.isRequired,
};

export default JobPage;
