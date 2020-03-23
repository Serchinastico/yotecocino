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
  background: #f0f0f0;
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
        ¿Dónde?
        <input
          type="text"
          value={address ?? ""}
          onChange={event => setAddress(event.target.value)}
        />
      </label>
      <label>
        ¿Día?
        <ReactDatePicker
          selected={date}
          onChange={date => setDate(date)}
          minDate={new Date()}
          showDisabledMonthNavigation
        />
      </label>
      <label>
        ¿Comida del día?
        <input
          type="radio"
          id="lunch"
          name="food_service"
          value="lunch"
          onChange={event => onServiceChange(event.target.value)}
        />
        <label htmlFor="lunch">Comida</label>
        <input
          type="radio"
          id="dinner"
          name="food_service"
          value="dinner"
          onChange={event => onServiceChange(event.target.value)}
        />
        <label htmlFor="dinner">Cena</label>
      </label>
      <input type="submit" value="Buscar" />
    </Container>
  );
};

export default SearchScreen;
