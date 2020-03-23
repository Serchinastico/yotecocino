import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import GoogleMapReact from "google-map-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background: #ff2360;
`;

const Marker = styled.div`
  width: 24px;
  height: 24px;
  background: #65ff12;
  border-radius: 8px;
`;

interface Props {
  offers: FoodOffer[];
}

const AnyReactComponent = ({ text }: any) => <Marker />;

const ResultMap: React.FC<Props> = ({ offers }) => {
  const googleMapsApiKey = "AIzaSyB0mGai6Dmu2WE8y5OLHZ2ci8orroLaOFo";
  return (
    <Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapsApiKey }}
        defaultCenter={{ lat: 40.3850959, lng: -3.6912495 }}
        defaultZoom={17}
      >
        {offers.map(offer => (
          <AnyReactComponent
            lat={offer.coordinates.latitude}
            lng={offer.coordinates.longitude}
            text={offer.food}
          ></AnyReactComponent>
        ))}
      </GoogleMapReact>
    </Container>
  );
};

export default ResultMap;
