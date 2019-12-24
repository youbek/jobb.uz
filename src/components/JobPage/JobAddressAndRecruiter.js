import React from "react";
import styled from "styled-components";

import { StaticGoogleMap, Marker } from "react-static-google-map";

import Col4 from "../Layout/Col4";

const JobLocation = styled.div`
  margin-left: 0.5rem;
`;

const JobLocationMap = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const JobAddressAndEmployer = styled.div`
  font-weight: 600;
  color: #6c757d;
  margin-top: 0.5rem;

  p {
    font-weight: 400;
    color: #383c43;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin-left: 5px;
    }
    span[status="false"] {
      background-color: #dcdde1;
    }
    span[status="true"] {
      background-color: #4cd137;
    }
  }
`;

function JobAddressAndRecruiter({ location, address, recruiter, status }) {
  return (
    <Col4>
      <JobLocation>
        <JobLocationMap>
          <StaticGoogleMap
            size="300x120"
            apiKey="AIzaSyATyzWeCcSuG_szpR2IjHm79kq9YcSUQh0"
          >
            <Marker location={location} />
          </StaticGoogleMap>
          <JobAddressAndEmployer>
            Address<p>{address}</p>
          </JobAddressAndEmployer>
          <JobAddressAndEmployer>
            Recruiter
            <p>
              {recruiter}
              <span status={status}></span>
            </p>
          </JobAddressAndEmployer>
        </JobLocationMap>
      </JobLocation>
    </Col4>
  );
}

export default JobAddressAndRecruiter;
