import React, { Fragment } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import ResultRow from "./ResultRow";
import { CircularProgress, withStyles } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface Props {
  offers: FoodOffer[];
  isLoading: boolean;
  selectedOffer?: FoodOffer;
  onOfferSelected: (offer: FoodOffer) => void;
  onOfferHovered: (offer?: FoodOffer) => void;
  classes: any;
}

const NotFoundIllustration = styled.img`
  position: relative;
  justify-self: flex-end;
  max-height: 450px;
  height: 100%;
  @media (max-width: 960px) {
    height: 0;
  }
`;

const NoFoundText = styled.p`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 16px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-content: center;
  align-items: center;
`;

const styles = {
  progressStyle: {
    color: "#E27861"
  }
};

const ResultList: React.FC<Props> = ({
  offers,
  isLoading,
  selectedOffer,
  onOfferSelected,
  onOfferHovered,
  classes
}) => {
  const Loading = () => {
    return (
      <LoadingContainer>
        <CircularProgress className={classes.progressStyle} />
      </LoadingContainer>
    );
  };

  const EmptyCase = () => {
    return (
      <Fragment>
        <NotFoundIllustration src={"img/il_empty.svg"} />
        <NoFoundText>
          Ooh :(, parece que no hay nadie cocinando en tu zona.
        </NoFoundText>
      </Fragment>
    );
  };

  let results;
  if (isLoading) {
    results = <Loading />;
  } else if (offers.length === 0) {
    results = <EmptyCase />;
  } else {
    results = offers.map(offer => (
      <ResultRow
        key={offer.food}
        offer={offer}
        onOfferSelected={onOfferSelected}
        onOfferHovered={onOfferHovered}
        isSelected={offer.food === selectedOffer?.food}
      />
    ));
  }

  return <Container>{results}</Container>;
};

export default withStyles(styles)(ResultList);
