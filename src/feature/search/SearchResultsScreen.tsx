import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";
import ResultList from "./components/ResultList";
import ResultMap from "./components/ResultMap";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
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
      address: "Calle embajadores",
      coordinates: { latitude: 40.21231, longitude: -3.123141 },
      food: "Albóndigas con salsa",
      contact: "@Serchinastico"
    }
  ];
  return (
    <Container>
      <ResultList offers={offers} />
      <ResultMap offers={offers} />
    </Container>
  );
};

export default SearchResultsScreen;
