import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";

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
  return (
    <Container>{`${coordinates.latitude}, ${coordinates.longitude}, ${day}, ${service}`}</Container>
  );
};

export default SearchResultsScreen;
