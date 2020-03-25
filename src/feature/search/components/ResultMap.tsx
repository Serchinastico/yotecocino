import React, {useState} from "react";
import config from "../../../foundation/Config";
import ReactMapGL, {WebMercatorViewport} from "react-map-gl";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import {FoodOffer} from "foundation/types/FoodOffer";
import {useBoundingBox} from "../hooks/UseBoundingBox";
import {Coordinates} from "foundation/types/Coordinates";
import ResultMapMarkers from "./ResultMapMarkers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  min-height: 450px;
`;

const Map = styled(ReactMapGL)`
  border-radius: 32px 32px 0px 0px;
`;

interface Props {
  searchedArea: Coordinates;
  offers: FoodOffer[];
  selectedOffer?: FoodOffer;
  hoveredOffer?: FoodOffer;
  onOfferSelected: (offer: FoodOffer) => void;
}

const ResultMap: React.FC<Props> = ({
                                      searchedArea,
                                      offers,
                                      selectedOffer,
                                      hoveredOffer,
                                      onOfferSelected
                                    }) => {
  const auth = {
    mapboxApiAccessToken: config.mapsToken
  };

  const mapConfig = {
    mapStyle: config.mapLayout,
    zoom: 15
  };

  let noOffersFound = offers.length === 0;
  const allCoordinates = noOffersFound ? [searchedArea] : offers.map(offer => offer.coordinates);

  const boundingBox = useBoundingBox(allCoordinates);

  const [viewport, setViewport] = useState<Coordinates | undefined>(undefined);



  let locationViewPort = allCoordinates.length === 1 ?
    {
      ...allCoordinates[0],
      zoom: 15
    }
    :
    new WebMercatorViewport({width: 800, height: 600}).fitBounds(
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
      {padding: 150}
    );
  const mapViewport =
    viewport !== undefined
      ? viewport
      : locationViewPort;

  let resultMapMarkers = noOffersFound ? null : <ResultMapMarkers
    offers={offers}
    selectedOffer={selectedOffer}
    hoveredOffer={hoveredOffer}
    onOfferSelected={onOfferSelected}
  />;
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
        {resultMapMarkers}
      </Map>
    </Container>
  );
};

export default ResultMap;
