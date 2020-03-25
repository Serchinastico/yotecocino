import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import {FoodOffer} from "foundation/types/FoodOffer";
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

const NotFoundIllustration = styled.img`
  position: relative;
  justify-self: flex-end;
  max-height: 450px;
  height: 100%;
`;

const NoFoundText = styled.p`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 16px;
  text-align: center;
`

const ResultList: React.FC<Props> = ({
                                       offers,
                                       selectedOffer,
                                       onOfferSelected,
                                       onOfferHovered
                                     }) => {
    const results = offers.length === 0 ?
      <>
        <NotFoundIllustration src={"img/empty-resultset.svg"}/>
        <NoFoundText>Ooh :(, parece que no hay nadie cocinando en tu zona.</NoFoundText>
      </>

      :
      offers.map(offer => (
        <ResultRow
          key={offer.food}
          offer={offer}
          onOfferSelected={onOfferSelected}
          onOfferHovered={onOfferHovered}
          isSelected={offer.food === selectedOffer?.food}
        />
      ));
    return (
      <Container>
        {results}
      </Container>
    );
  }
;

export default ResultList;
