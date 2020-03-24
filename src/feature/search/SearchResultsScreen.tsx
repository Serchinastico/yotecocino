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
  border-radius: 16px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ListContainer = styled.div`
  width: 360px;
  height: 100%;
  overflow-y: auto;
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
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.dinner
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    },
    {
      date: "2020-03-23",
      coordinates: { latitude: 40.3850959, longitude: -3.6912495 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico",
      service: Service.lunch
    }
  ];
  return (
    <Container>
      <ListContainer>
        <ResultList offers={offers} />
      </ListContainer>
      <ResultMap offers={offers} />
    </Container>
  );
};

export default SearchResultsScreen;
