import React from "react";
import styled from "styled-components";

import { StaticGoogleMap, Marker } from "react-static-google-map";
import { Col } from "components";

import { IVacancyAddress } from "types";

const LocationMap = styled.div`
  box-shadow: inset 0px 0px 0px 1px #eee;
  box-sizing: border-box;
  border-radius: 3px;

  img {
    width: 100%;
    border-radius: 3px;
  }
`;

const LocationText = styled.div`
  font-weight: 600;
  color: #6c757d;
  padding: 0.5rem;

  p {
    font-weight: 400;
    color: #383c43;
    margin: 0;

    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      margin-left: 5px;
    }
  }
`;

interface Props {
  address: IVacancyAddress;
}

function Address({ address }: Props) {
  return (
    <Col size="col4">
      <LocationMap>
        <StaticGoogleMap
          size="300x120"
          apiKey="AIzaSyATyzWeCcSuG_szpR2IjHm79kq9YcSUQh0"
          zoom={"12"}
        >
          <Marker location={`${address.lat} ${address.lng}`} />
        </StaticGoogleMap>
        <LocationText>
          <label>Местоположение</label>
          <p>{address.name}</p>
        </LocationText>
      </LocationMap>
    </Col>
  );
}

export default Address;
