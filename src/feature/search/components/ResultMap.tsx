import React, { useState } from "react";
import config from "../../../foundation/Config";
import ReactMapGL, { WebMercatorViewport } from "react-map-gl";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import { useBoundingBox } from "../hooks/UseBoundingBox";
import { Coordinates } from "foundation/types/Coordinates";
import ResultMapMarkers from "./ResultMapMarkers";

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
  selectedOffer?: FoodOffer;
  onOfferSelected: (offer: FoodOffer) => void;
}

const ResultMap: React.FC<Props> = ({
  offers,
  selectedOffer,
  onOfferSelected
}) => {
  const auth = {
    mapboxApiAccessToken: config.mapsToken
  };

  const mapConfig = {
    mapStyle: config.mapLayout,
    zoom: 15
  };

  const allCoordinates = offers.map(offer => offer.coordinates);

  const boundingBox = useBoundingBox(allCoordinates);

  const [viewport, setViewport] = useState<Coordinates | undefined>(undefined);

  const mapViewport =
    viewport !== undefined
      ? viewport
      : new WebMercatorViewport({ width: 800, height: 600 }).fitBounds(
          [
            [
              boundingBox.swCoordinate.longitude,
              boundingBox.swCoordinate.latitude
            ],
            [
              boundingBox.neCoordinate.longitude,
              boundingBox.neCoordinate.latitude
            ]
          ],
          { padding: 150 }
        );

  return (
    <Container>
      <Map
        {...auth}
        {...mapConfig}
        {...mapViewport}
        width="100%"
        height="100%"
        onViewportChange={props => setViewport(props)}
      >
        <ResultMapMarkers
          offers={offers}
          selectedOffer={selectedOffer}
          onOfferSelected={onOfferSelected}
        />
      </Map>
    </Container>
  );
};

export default ResultMap;
