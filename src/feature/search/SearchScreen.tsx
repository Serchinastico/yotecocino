import React, { useState } from "react";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { Service } from "foundation/types/Service";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: #ffffff;
  border-radius: 32px;
  position: fixed;
  padding: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
`;

const InputTitle = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
`;

const TextInput = styled.input`
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  height: 40px;
  width: 470px;
  border-radius: 24px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 0.9rem;
  margin-top: 8px;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    font-family: "Montserrat", sans-serif;
  }
`;

const DateInput = styled(ReactDatePicker)`
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  height: 40px;
  width: 470px;
  border-radius: 24px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 0.9rem;
  margin-top: 8px;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    font-family: "Montserrat", sans-serif;
  }
`;

const RadioInput = styled.input`
  padding: 16px;
  margin: 16px;
  font-size: 1rem;
`;

const ButtonInput = styled.input`
  background: #e27861;
  padding: 16px;
  margin-top: 16px;
  border-radius: 48px;
  border: none;
  width: 116px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  align-self: center;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 16px;
`;

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
