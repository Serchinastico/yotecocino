import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import ResultRow from "./ResultRow";

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

const ResultList: React.FC<Props> = ({ offers }) => {
  return (
    <Container>
      {offers.map(offer => (
        <ResultRow offer={offer} />
      ))}
    </Container>
  );
};

export default ResultList;
