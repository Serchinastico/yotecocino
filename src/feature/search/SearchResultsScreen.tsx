import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";
import ResultList from "./components/ResultList";
import ResultMap from "./components/ResultMap";
import { Service } from "../../foundation/types/Service";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 85%;
  height: 80%;
  margin: 0;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-right: 16px;
  flex: 1;
`;

const MapContainer = styled.div`
  margin-left: 16px;
  flex: 2;
`;

interface Props {
  coordinates: Coordinates;
  day: string;
  service: string;
}

const SearchResultsScreen: React.FC<Props> = ({
  coordinates,
  day,
  service
}) => {
  const offers = [
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3830854, longitude: -3.6922495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3820959, longitude: -3.6932495 },
      food: "Macarrones con queso",
      contact: "@Serchinastico",
      service: Service.dinner
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6902495 },
      food: "Berenjenas rellenas",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3830959, longitude: -3.6905495 },
      food: "Ensalada de atún",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Solomillo de vaca vieja",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3820959, longitude: -3.69 },
      food: "Salmón con verduras",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3750959, longitude: -3.6912495 },
      food: "Salteado de tofu",
      contact: "@Serchinastico",
      service: Service.lunch
    }
  ];
  return (
    <Container>
      <ListContainer>
        <ResultList offers={offers} />
      </ListContainer>
      <MapContainer>
        <ResultMap offers={offers} />
      </MapContainer>
    </Container>
  );
};

export default SearchResultsScreen;
