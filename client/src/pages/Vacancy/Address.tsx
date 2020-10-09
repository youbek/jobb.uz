import React from "react";
import styled from "styled-components";

import { StaticGoogleMap, Marker } from "react-static-google-map";
import { IVacancyAddress } from "types";

const Container = styled.div`
  margin-left: 0.5rem;
`;

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
  address: IVacancyAddress;
}

function Address({ address }: Props) {
  return (
    <Container>
      <LocationMap>
        <StaticGoogleMap
          size="300x120"
          apiKey="AIzaSyATyzWeCcSuG_szpR2IjHm79kq9YcSUQh0"
          zoom={"12"}
        >
          <Marker location={`${address.lat} ${address.lng}`} />
        </StaticGoogleMap>
      </LocationMap>
      <LocationText>
        <label>Местоположение</label>
        <p>{address.name}</p>
      </LocationText>
    </Container>
  );
}

export default Address;
