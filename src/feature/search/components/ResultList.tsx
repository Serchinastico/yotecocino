import React, { Fragment } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { FoodOffer } from "foundation/types/FoodOffer";
import ResultRow from "./ResultRow";
import { CircularProgress, withStyles } from "@material-ui/core";
import ShareInTwitterButton from "../../ui/ShareInTwitterButton";
import config from "../../../foundation/Config";

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
  address?: string;
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

const ResultsDescription = styled.p`
  margin: 0;
  font-weight: 600;
  margin-left: 24px;
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
  classes,
  address
}) => {
  const Loading = () => {
    return (
      <LoadingContainer>
        <CircularProgress className={classes.progressStyle} />
      </LoadingContainer>
    );
  };

  const EmptyCase = () => {
    const message =
      "¡Acabo de solicitar un tupper a través de yotecocino.com! La iniciativa que pone en contacto a sanitarios y otros profesionales en primera línea con cocinillas.";
    return (
      <Fragment>
        <NotFoundIllustration src={"img/il_empty.svg"} />
        <NoFoundText>
          Ooh :(, parece que no hay nadie cocinando en tu zona.
        </NoFoundText>
        <ShareInTwitterButton
          label="Busca a tu cocinillas :)"
          text={message}
          hashtag={config.hashtag}
          url={config.url}
        />
      </Fragment>
    );
  };

  let results;
  if (isLoading) {
    results = <Loading />;
  } else if (offers.length === 0) {
    results = <EmptyCase />;
  } else {
    const list = offers.map(offer => (
      <ResultRow
        key={`${offer.food}|${offer.contact}|${offer.coordinates.latitude}|${offer.coordinates.longitude}`}
        offer={offer}
        onOfferSelected={onOfferSelected}
        onOfferHovered={onOfferHovered}
        isSelected={
          selectedOffer?.food === offer.food &&
          selectedOffer?.contact === offer.contact &&
          selectedOffer?.coordinates.latitude === offer.coordinates.latitude &&
          selectedOffer?.coordinates.longitude === offer.coordinates.longitude
        }
      />
    ));
    results = (
      <div>
        <ResultsDescription>
          ¡Estos cocinillas están por tu zona! Anímate a contactar a alguno de
          ellos para acordar la entrega.
        </ResultsDescription>
        {list}
      </div>
    );
  }

  return <Container>{results}</Container>;
};

export default withStyles(styles)(ResultList);
