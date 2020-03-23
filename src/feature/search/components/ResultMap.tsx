import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import ResultRow from "./ResultRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #002360;
`;

interface Props {
  offers: FoodOffer[];
}

const ResultMap: React.FC<Props> = ({ offers }) => {
  return (
    <Container>
      {offers.map(offer => (
        <ResultRow offer={offer} />
      ))}
    </Container>
  );
};

export default ResultMap;
