import React, { Fragment, memo } from "react";
import { Marker } from "react-map-gl";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import styled from "styled-components";

interface Props {
  offers: FoodOffer[];
  selectedOffer?: FoodOffer;
  hoveredOffer?: FoodOffer;
  onOfferSelected: (offer: FoodOffer) => void;
  onOfferHovered: (offer?: FoodOffer) => void;
}

interface OfferMarkerProps {
  offer: FoodOffer;
}

interface OfferMarkerIconProps {
  isSelected: boolean;
}

const equalsOffer = (offerA?: FoodOffer, offerB?: FoodOffer): boolean => {
  return (
    offerA?.food === offerB?.food &&
    offerA?.coordinates.latitude === offerB?.coordinates.latitude &&
    offerA?.coordinates.longitude === offerB?.coordinates.longitude
  );
};

const ResultMapMarkers: React.FC<Props> = ({
  offers,
  selectedOffer,
  hoveredOffer,
  onOfferSelected,
  onOfferHovered
}) => {
  const markerIcon = require("../../../img/ic_marker.svg") as string;
  const selectedMarkerIcon = require("../../../img/ic_marker_selected.svg") as string;
  const hoveredMarkerIcon = require("../../../img/ic_marker_hovered.svg") as string;

  /**
   * This sends the hovered offer to the last position so that it's rendered last
   * and so it appears always on top
   * @param offers List of food offers
   */
  const sendingHoveredOfferToLastPosition = (offers: FoodOffer[]) => {
    const hovered = offers.find(offer => equalsOffer(offer, hoveredOffer));
    if (hovered === undefined) {
      return offers;
    }

    const newoffers = offers.filter(offer => offer !== hovered);
    newoffers.push(hovered);
    return newoffers;
  };

  const OfferMarker = ({ offer }: OfferMarkerProps) => {
    let icon;

    if (equalsOffer(offer, selectedOffer)) {
      icon = selectedMarkerIcon;
    } else if (equalsOffer(offer, hoveredOffer)) {
      icon = hoveredMarkerIcon;
    } else {
      icon = markerIcon;
    }

    return (
      <Marker
        key={`${offer.food}|${offer.contact}|${offer.coordinates.latitude}|${offer.coordinates.longitude}`}
        longitude={offer.coordinates.longitude}
        latitude={offer.coordinates.latitude}
        offsetTop={-56}
        offsetLeft={-24}
      >
        <img
          src={icon}
          onClick={() => onOfferSelected(offer)}
          onMouseEnter={() => onOfferHovered(offer)}
          onMouseLeave={() => onOfferHovered(undefined)}
          alt=""
        ></img>
      </Marker>
    );
  };

  const Markers = () => {
    const updatedOffers = sendingHoveredOfferToLastPosition(offers);
    const markers = updatedOffers.map(offer => <OfferMarker offer={offer} />);
    return <Fragment>{markers}</Fragment>;
  };

  return <Markers />;
};

export default memo(ResultMapMarkers);
