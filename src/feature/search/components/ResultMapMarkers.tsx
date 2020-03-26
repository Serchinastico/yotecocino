import React, { Fragment, memo } from "react";
import { Marker } from "react-map-gl";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";

interface Props {
  offers: FoodOffer[];
  selectedOffer?: FoodOffer;
  hoveredOffer?: FoodOffer;
  onOfferSelected: (offer: FoodOffer) => void;
}

interface OfferMarkerProps {
  offer: FoodOffer;
}

const ResultMapMarkers: React.FC<Props> = ({
  offers,
  selectedOffer,
  hoveredOffer,
  onOfferSelected
}) => {
  const markerIcon = require("../../../img/ic_marker.svg") as string;
  const selectedMarkerIcon = require("../../../img/ic_marker_selected.svg") as string;
  const hoveredMarkerIcon = require("../../../img/ic_marker_hovered.svg") as string;

  const OfferMarker = ({ offer }: OfferMarkerProps) => {
    let icon;

    if (
      selectedOffer?.food === offer.food &&
      selectedOffer?.coordinates.latitude === offer.coordinates.latitude &&
      selectedOffer?.coordinates.longitude === offer.coordinates.longitude
    ) {
      icon = selectedMarkerIcon;
    } else if (
      hoveredOffer?.food === offer.food &&
      hoveredOffer?.coordinates.latitude === offer.coordinates.latitude &&
      hoveredOffer?.coordinates.longitude === offer.coordinates.longitude
    ) {
      icon = hoveredMarkerIcon;
    } else {
      icon = markerIcon;
    }

    return (
      <Marker
        key={`${offer.food}|${offer.contact}|${offer.coordinates.latitude}|${offer.coordinates.longitude}`}
        longitude={offer.coordinates.longitude}
        latitude={offer.coordinates.latitude}
        offsetTop={-32}
        offsetLeft={-32}
      >
        <img src={icon} onClick={() => onOfferSelected(offer)} alt=""></img>
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
