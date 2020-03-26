import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";
import ResultList from "./components/ResultList";
import ResultMap from "./components/ResultMap";
import { FoodOffer } from "foundation/types/FoodOffer";
import FindFood from "../../foundation/food/FindFood";
import Grid from "@material-ui/core/Grid";
import HomeButton from "feature/ui/HomeButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 80%;
  margin: 16px 0;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 960px) {
    margin: 24px 0;
  }
`;

interface Props {
  coordinates: Coordinates;
  address?: string;
}

const SearchResultsScreen: React.FC<Props> = ({ coordinates, address }) => {
  const findFood = new FindFood();
  const [offers, setOffers] = useState<FoodOffer[]>([]);
  const [needToLoad, setNeedToLoad] = useState<boolean>(true);

  useEffect(() => {
    if (needToLoad) {
      findFood
        .execute({
          nearTo: coordinates
        })
        .then(found => {
          setOffers(found);
          setNeedToLoad(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedOffer, setSelectedOffer] = useState<FoodOffer | undefined>(
    undefined
  );
  const [hoveredOffer, setHoveredOffer] = useState<FoodOffer | undefined>(
    undefined
  );

  return (
    <div>
      <HomeButton />
      <Container>
        <Grid container={true} spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <ResultList
              offers={offers}
              isLoading={needToLoad}
              onOfferSelected={offer => setSelectedOffer(offer)}
              onOfferHovered={offer => setHoveredOffer(offer)}
              selectedOffer={selectedOffer}
              address={address}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <ResultMap
              searchedArea={coordinates}
              offers={offers}
              selectedOffer={selectedOffer}
              hoveredOffer={hoveredOffer}
              onOfferSelected={offer => setSelectedOffer(offer)}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SearchResultsScreen;
