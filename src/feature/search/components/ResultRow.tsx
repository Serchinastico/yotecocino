import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";
import { FoodOffer } from "foundation/types/FoodOffer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80px;
  background: #446600;
`;

interface Props {
  offer: FoodOffer;
}

const ResultRow: React.FC<Props> = ({ offer }) => {
  return (
    <Container>
      <p>{offer.address}</p>
      <p>{offer.food}</p>
      <p>{offer.contact}</p>
    </Container>
  );
};

export default ResultRow;
