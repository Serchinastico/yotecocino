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
  background: #002360;
`;

interface Props {
  offers: FoodOffer[];
}

const ResultMap: React.FC<Props> = ({ offers }) => {
  const asd = "AIzaSyB0mGai6Dmu2WE8y5OLHZ2ci8orroLaOFo";
  return (
    <Container>
      <GoogleMapReact />
    </Container>
  );
};

export default ResultMap;
