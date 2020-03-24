import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background: #f6f6f6;
  margin: 16px;
  padding: 16px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Food = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;

const Contact = styled.p`
  margin: 0;
  margin-top: 8px;
  font-weight: 600;
  color: #2997fc;
`;

interface Props {
  offer: FoodOffer;
}

const ResultRow: React.FC<Props> = ({ offer }) => {
  return (
    <Container>
      <Food>{offer.food}</Food>
      <Contact>{offer.contact}</Contact>
    </Container>
  );
};

export default ResultRow;
