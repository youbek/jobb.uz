import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { StaticGoogleMap, Marker } from "react-static-google-map";
import { Col } from "components";

const JobLocation = styled.div`
  margin-left: 0.5rem;
`;

const JobLocationMap = styled.div`
  box-shadow: inset 0px 0px 0px 1px #eee;
  box-sizing: border-box;
  border-radius: 3px;
  img {
    width: 100%;
    border-radius: 3px;
  }
`;

const JobAddressAndEmployer = styled.div`
  font-weight: 600;
  color: #6c757d;
  padding: 0.5rem;

  p {
    font-weight: 400;
    color: #383c43;
    margin-bottom: 0;
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

interface Props {
  location: string;
  address: string;
}

function JobAddressAndRecruiter({ location, address }: Props) {
  return (
    <Col col4>
      <JobLocation>
        <JobLocationMap>
          <StaticGoogleMap
            size="300x120"
            apiKey="AIzaSyATyzWeCcSuG_szpR2IjHm79kq9YcSUQh0"
            zoom={
              !location || location.replace(/ /g, "") === "г.Ташкент"
                ? "11"
                : "15"
            }
          >
            <Marker
              location={
                address === "г. Ташкент" ? "41.311081, 69.240562" : location
              }
            />
          </StaticGoogleMap>
          <JobAddressAndEmployer>
            Местоположение
            <p>{address}</p>
          </JobAddressAndEmployer>
        </JobLocationMap>
      </JobLocation>
    </Col>
  );
}

export default JobAddressAndRecruiter;
