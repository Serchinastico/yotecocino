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
  width: 50vw;
  height: 90vh;
  background: #ffffff;
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InputTitle = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
`;

const TextInput = styled.input`
  border: 1px solid #a0a0a0;
  height: 44px;
  width: 100%;
  border-radius: 24px;
  padding-left: 16px;
  font-size: 1rem;
`;

const DateInput = styled(ReactDatePicker)`
  border: 1px solid #a0a0a0;
  height: 44px;
  border-radius: 24px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 1rem;
`;

const RadioInput = styled.input`
  padding: 16px;
  margin: 16px;
  font-size: 1rem;
`;

const ButtonInput = styled.input`
  background: #a07ed2;
  padding: 16px;
  margin: 16px;
  border-radius: 48px;
  border: none;
  font-size: 1.2rem;
  color: #fff;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.7);
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
      <label>
        <InputTitle>¿Dónde?</InputTitle>
        <TextInput
          type="text"
          placeholder="Introduce una calle cerca de donde trabajas"
          value={address ?? ""}
          onChange={event => setAddress(event.target.value)}
        />
      </label>
      <label>
        <InputTitle>¿Día?</InputTitle>
        <DateInput
          placeholderText="¿Cuánto te viene bien?"
          selected={date}
          onChange={date => setDate(date)}
          minDate={new Date()}
        />
      </label>
      <label>
        <InputTitle>¿Comida del día?</InputTitle>
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
      <ButtonInput type="submit" value="Buscar" />
    </Container>
  );
};

export default SearchScreen;
