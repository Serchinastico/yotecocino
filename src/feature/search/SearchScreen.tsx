import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { Container } from "../ui/StyledForm";
import LocationInput from "../ui/LocationInput";
import SubmitButton from "../ui/SubmitButton";
import HomeButton from "feature/ui/HomeButton";
import { PlaceSearchResult } from "../../foundation/places/ConvertLocationToCoords";

const SearchScreen: React.FC = () => {
  const history = useHistory();
  const [address, setAddress] = useState<PlaceSearchResult | null>(null);

  const onFormSubmit = () => {
    const latitude = address?.latitude;
    const longitude = address?.longitude;
    const rawAddress = address?.address || "";
    history.push(
      `/search/results?location=${latitude},${longitude}&address=${encodeURI(
        rawAddress
      )}`
    );
  };

  const criteriaToSearchIsCompleted =
    address !== null &&
    address !== undefined &&
    address?.latitude !== undefined &&
    address?.longitude !== undefined;

  return (
    <div>
      <HomeButton />
      <Container onSubmit={onFormSubmit}>
        <LocationInput
          label="¿Dónde trabajas?"
          setLocation={setAddress}
          showMap={false}
          hint="Puede ser una dirección aproximada"
        />
        <SubmitButton
          label="Buscar"
          onSubmit={onFormSubmit}
          disabled={!criteriaToSearchIsCompleted}
        />
      </Container>
    </div>
  );
};

export default SearchScreen;
