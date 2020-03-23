import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";
import { FoodOffer } from "foundation/types/FoodOffer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background: #fff;
  margin: 16px;
  padding: 16px;
`;

const Food = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const Address = styled.p`
  margin: 0;
`;

const Contact = styled.p`
  margin: 0;
  font-weight: 600;
`;

interface Props {
  offer: FoodOffer;
}

const ResultRow: React.FC<Props> = ({ offer }) => {
  return (
    <Container>
      <Food>{offer.food}</Food>
      <Address>{offer.address}</Address>
      <Contact>{offer.contact}</Contact>
    </Container>
  );
};

export default ResultRow;
