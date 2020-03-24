import React, { useState, Fragment } from "react";
import config from "../../../foundation/Config";
import ReactMapGL, { Marker } from "react-map-gl";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Map = styled(ReactMapGL)`
  border-radius: 32px 32px 0px 0px;
`;

interface Props {
  offers: FoodOffer[];
}

const ResultMap: React.FC<Props> = ({ offers }) => {
  const auth = {
    mapboxApiAccessToken: config.mapsToken
  };

  const mapConfig = {
    mapStyle: config.mapLayout,
    zoom: 15
  };

  const [viewport, setViewport] = useState({
    latitude: 40.3850959,
    longitude: -3.6912495
  });

  const MarkerIcon = () => {
    return (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="32" fill="#2997FC" fill-opacity="0.4" />
        <circle
          cx="32"
          cy="32"
          r="16"
          fill="#2997FC"
          fill-opacity="0.2"
          stroke="#2997FC"
          stroke-width="0.423841"
        />
        <circle cx="32" cy="32" r="6" fill="#2997FC" />
      </svg>
    );
  };

  const Markers = () => {
    const markers = offers.map(offer => (
      <Marker
        key={offer.food}
        longitude={offer.coordinates.longitude}
        latitude={offer.coordinates.latitude}
        offsetTop={-32}
        offsetLeft={-32}
      >
        <MarkerIcon />
      </Marker>
    ));
    return <Fragment>{markers}</Fragment>;
  };

  return (
    <Container>
      <Map
        {...auth}
        {...mapConfig}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={props => setViewport(props)}
      >
        <Markers />
      </Map>
    </Container>
  );
};

export default ResultMap;
