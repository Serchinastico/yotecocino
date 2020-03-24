import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Coordinates } from "foundation/types/Coordinates";
import ResultList from "./components/ResultList";
import ResultMap from "./components/ResultMap";
import { Service } from "../../foundation/types/Service";
import { FoodOffer } from "foundation/types/FoodOffer";
import FindFood from "../../foundation/food/FindFood";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 85%;
  height: 80%;
  margin: 0;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-right: 16px;
  flex: 1;
`;

const MapContainer = styled.div`
  margin-left: 16px;
  flex: 2;
`;

interface Props {
  coordinates: Coordinates;
  day: Date;
  service: Service;
}

const SearchResultsScreen: React.FC<Props> = ({
  coordinates,
  day,
  service
}) => {
  const findFood = new FindFood();
  const [offers, setOffers] = useState<FoodOffer[]>([]);
  const [needToLoad, setNeedToLoad] = useState<boolean>(true);

  React.useEffect(() => {
    if (needToLoad) {
      findFood
        .execute({
          day,
          service,
          nearTo: coordinates
        })
        .then(found => {
          setOffers(found);
        });
      setNeedToLoad(false);
    }
  }, [needToLoad, findFood, day, service, coordinates]);

  console.log(offers);

  const [selectedOffer, setSelectedOffer] = useState<FoodOffer | undefined>(
    undefined
  );

  let map =
    offers.length === 0 ? null : (
      <MapContainer>
        <ResultMap offers={offers} selectedOffer={selectedOffer} />
      </MapContainer>
    );
  return (
    <Container>
      <ListContainer>
        <ResultList
          offers={offers}
          onOfferSelected={offer => setSelectedOffer(offer)}
          selectedOffer={selectedOffer}
        />
      </ListContainer>
      {map}
    </Container>
  );
};

export default SearchResultsScreen;
