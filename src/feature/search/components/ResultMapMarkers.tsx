import React, { Fragment, memo } from "react";
import { Marker } from "react-map-gl";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";

interface Props {
  offers: FoodOffer[];
  selectedOffer?: FoodOffer;
}

interface OfferMarkerProps {
  offer: FoodOffer;
}

const ResultMapMarkers: React.FC<Props> = ({ offers, selectedOffer }) => {
  const markerIcon = require("../../../img/ic_marker.svg") as string;
  const selectedMarkerIcon = require("../../../img/ic_marker_selected.svg") as string;

  const OfferMarker = ({ offer }: OfferMarkerProps) => {
    const icon =
      selectedOffer?.food === offer.food &&
      selectedOffer?.coordinates.latitude === offer.coordinates.latitude &&
      selectedOffer?.coordinates.longitude === offer.coordinates.longitude
        ? selectedMarkerIcon
        : markerIcon;

    return (
      <Marker
        key={offer.food}
        longitude={offer.coordinates.longitude}
        latitude={offer.coordinates.latitude}
        offsetTop={-32}
        offsetLeft={-32}
      >
        <img src={icon}></img>
      </Marker>
    );
  };

  const Markers = () => {
    const markers = offers.map(offer => <OfferMarker offer={offer} />);
    return <Fragment>{markers}</Fragment>;
  };

  return <Markers />;
};

export default memo(ResultMapMarkers);
