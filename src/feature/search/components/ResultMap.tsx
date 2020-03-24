import React, { useState, Fragment } from "react";
import config from "../../../foundation/Config";
import ReactMapGL, { Marker, WebMercatorViewport } from "react-map-gl";
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

  const allCoordinates = offers.map(offer => offer.coordinates);
  const allLatitudes = allCoordinates.map(c => c.latitude);
  const allLongitudes = allCoordinates.map(c => c.longitude);
  const minLatitude = allLatitudes.reduce(
    (a: number, b: number) => (a < b ? a : b),
    90
  );
  const maxLatitude = allLatitudes.reduce(
    (a: number, b: number) => (a > b ? a : b),
    -90
  );
  const minLongitude = allLongitudes.reduce(
    (a: number, b: number) => (a < b ? a : b),
    180
  );
  const maxLongitude = allLongitudes.reduce(
    (a: number, b: number) => (a > b ? a : b),
    -180
  );

  const [didChangeViewport, setDidChangeViewport] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 40.3850959,
    longitude: -3.6912495
  });

  const Markers = () => {
    const markerIcon = require("../../../img/ic_marker.svg") as string;

    const markers = offers.map(offer => (
      <Marker
        key={offer.food}
        longitude={offer.coordinates.longitude}
        latitude={offer.coordinates.latitude}
        offsetTop={-32}
        offsetLeft={-32}
      >
        <img src={markerIcon}></img>
      </Marker>
    ));
    return <Fragment>{markers}</Fragment>;
  };

  const viewport2 = didChangeViewport
    ? viewport
    : new WebMercatorViewport({ width: 800, height: 600 }).fitBounds(
        [
          [minLongitude, minLatitude],
          [maxLongitude, maxLatitude]
        ],
        { padding: 20 }
      );
  return (
    <Container>
      <Map
        {...auth}
        {...mapConfig}
        {...viewport2}
        width="100%"
        height="100%"
        onViewportChange={props => {
          setDidChangeViewport(true);
          setViewport(props);
        }}
      >
        <Markers />
      </Map>
    </Container>
  );
};

export default ResultMap;
