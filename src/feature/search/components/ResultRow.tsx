import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";

interface ContainerProps {
  readonly isSelected: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  background: ${props => (props.isSelected ? "#D3EAFF" : "#f6f6f6")};
  margin: 16px;
  padding: 16px;
  box-shadow: 0px 8px 0px
    ${props => (props.isSelected ? "#92CAFF" : "rgba(0, 0, 0, 0.1)")};
  border-radius: 8px;
  border: 2px solid ${props => (props.isSelected ? "#D3EAFF" : "#f6f6f6")};
  cursor: pointer;
  :hover {
    border: 2px solid #2997fc;
  }
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
  isSelected: boolean;
  onOfferSelected: (offer: FoodOffer) => void;
}

const ResultRow: React.FC<Props> = ({ offer, isSelected, onOfferSelected }) => {
  return (
    <Container onClick={() => onOfferSelected(offer)} isSelected={isSelected}>
      <Food>{offer.food}</Food>
      <Contact>{offer.contact}</Contact>
    </Container>
  );
};

export default ResultRow;
