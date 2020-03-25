import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { Service } from "foundation/types/Service";
import {
  Container,
  InputTitle,
  DateInput,
  RadioInput,
  ButtonInput,
  Title
} from "../ui/StyledForm";
import LocationInput from "../ui/LocationInput";
import { Coordinates } from "../../foundation/types/Coordinates";

const SearchScreen: React.FC = () => {
  const history = useHistory();
  const [address, setAddress] = useState<Coordinates | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const onFormSubmit = () => {
    const latitude = address?.latitude;
    const longitude = address?.longitude;
    const formattedDate = dayjs(date ?? Date()).format("YYYY-MM-DD");
    history.push(
      `/search/results?location=${latitude},${longitude}&day=${formattedDate}&service=${service}`
    );
  };

  const onServiceChange = (service: string) => {
    switch (service) {
      case "lunch":
        setService(Service.lunch);
        break;
      case "dinner":
        setService(Service.dinner);
        break;
      default:
        throw new Error(`Invalid service: ${service}`);
    }
  };

  const SearchButton = () => {
    if (address !== null && date !== null && service !== null) {
      return <ButtonInput type="submit" value="Buscar" />;
    } else {
      return <ButtonInput disabled type="submit" value="Buscar" />;
    }
  };

  return (
    <Container onSubmit={onFormSubmit}>
      <Title>
        Completa los siguientes campos para buscar una comida preparada
      </Title>
      <LocationInput
        label="¿Dónde trabajas?"
        setLocation={setAddress}
        showMap={false}
        hint="Puede ser una dirección aproximada"
      />
      <label>
        <InputTitle>¿Qué día será la recogida?</InputTitle>
        <DateInput
          placeholderText="Selecciona el día"
          selected={date}
          onChange={date => setDate(date)}
          minDate={new Date()}
        />
      </label>
      <label>
        <InputTitle>¿Comida o cena?</InputTitle>
        <RadioInput
          type="radio"
          id="lunch"
          name="food_service"
          value="lunch"
          onChange={event => onServiceChange(event.target.value)}
        />
        <label htmlFor="lunch">Comida</label>
        <RadioInput
          type="radio"
          id="dinner"
          name="food_service"
          value="dinner"
          onChange={event => onServiceChange(event.target.value)}
        />
        <label htmlFor="dinner">Cena</label>
      </label>
      <SearchButton />
    </Container>
  );
};

export default SearchScreen;
