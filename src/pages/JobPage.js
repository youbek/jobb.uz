import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import JobInfo from "../components/JobInfo";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import {
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col,
} from "reactstrap";

import { SocketContext } from "../context/SocketContext";

import { GET_JOB } from "../graphql/queries/index";

function JobPage({ hashId }) {
  const getJobQuery = useQuery(GET_JOB, {
    variables: { hashId },
  });

  const [job, setJob] = useState(undefined);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("userDisconnected", trackUserDisconnection);

    return () => socket.off("userDisconnected", trackUserDisconnection);
  }, []);

  useEffect(() => {
    if (getJobQuery.data) {
      setJob(getJobQuery.data.job);
    }
  }, [getJobQuery]);

  useEffect(() => {
    if (!job) {
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

  const user = {
    isUserHr: false,
  };

  if (getJobQuery.error) throw new Error(`Error ${getJobQuery.error.message}`);

  if (getJobQuery.loading || job === undefined)
    return (
      <Container>
        <Row>
          <Col md="8">
            <Spinner />
          </Col>
        </Row>
      </Container>
    );

  if (!getJobQuery.data || !getJobQuery.data.job) {
    return <Redirect to="/404" />;
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <Container>
          <BreadcrumbItem>
            {<Link to="">Jobs in {job.address}</Link>}
          </BreadcrumbItem>
        </Container>
      </Breadcrumb>
      <Container>
        <Row>
          <Col md="8">
            <JobInfo job={job} user={user} />
          </Col>
          <Col md="4" className="address-and-employer-details">
            <div className="job-location ml-2">
              <div className="job-location-map">
                <StaticGoogleMap
                  size="300x120"
                  apiKey="AIzaSyATyzWeCcSuG_szpR2IjHm79kq9YcSUQh0"
                >
                  <Marker location="55.763756,37.854395 " />
                </StaticGoogleMap>
                <div className="job-location-address mt-2">
                  Address<p>{job.address}</p>
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
