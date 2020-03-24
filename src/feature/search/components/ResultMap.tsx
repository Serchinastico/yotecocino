import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;

interface Props {
  offers: FoodOffer[];
}

const ResultMap: React.FC<Props> = ({ offers }) => {
  return <Container></Container>;
};

export default ResultMap;
