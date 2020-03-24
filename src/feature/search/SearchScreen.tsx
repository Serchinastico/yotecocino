import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { Service } from "foundation/types/Service";
import {
  Container,
  InputTitle,
  TextInput,
  DateInput,
  RadioInput,
  ButtonInput,
  Title
} from "../ui/StyledForm";

const SearchScreen: React.FC = () => {
  const history = useHistory();
  const [address, setAddress] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const onFormSubmit = () => {
    const latitude = 40.33333; // TODO Get from address with Google API
    const longitude = -3.123131; // TODO Get from address with Google API
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

  return (
    <Container onSubmit={onFormSubmit}>
      <Title>
        Completa los siguientes campos para buscar una comida preparada
      </Title>
      <label>
        <InputTitle>¿Dónde trabajas?</InputTitle>
        <TextInput
          type="text"
          placeholder="Calle y número"
          value={address ?? ""}
          onChange={event => setAddress(event.target.value)}
        />
      </label>
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
      <ButtonInput type="submit" value="Enviar" />
    </Container>
  );
};

export default SearchScreen;
