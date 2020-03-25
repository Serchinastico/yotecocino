import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import ResultRow from "./ResultRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  offers: FoodOffer[];
  selectedOffer?: FoodOffer;
  onOfferSelected: (offer: FoodOffer) => void;
  onOfferHovered: (offer?: FoodOffer) => void;
}

const ResultList: React.FC<Props> = ({
  offers,
  selectedOffer,
  onOfferSelected,
  onOfferHovered
}) => {
  return (
    <Container>
      {offers.map(offer => (
        <ResultRow
          key={offer.food}
          offer={offer}
          onOfferSelected={onOfferSelected}
          onOfferHovered={onOfferHovered}
          isSelected={offer.food === selectedOffer?.food}
        />
      ))}
    </Container>
  );
};

export default ResultList;
