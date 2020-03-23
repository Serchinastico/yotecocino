import React, { useState } from "react";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  return (
    <Container>
      <label>
        ¿Dónde?
        <input type="text" value="asd" />
      </label>
      <label>
        ¿Día?
        <ReactDatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          minDate={new Date()}
          showDisabledMonthNavigation
        />
      </label>
      <label>
        ¿Comida del día?
        <input type="radio" id="lunch" name="food_time" value="lunch" />
        <label htmlFor="lunch">Comida</label>
        <input type="radio" id="dinner" name="food_time" value="dinner" />
        <label htmlFor="dinner">Cena</label>
      </label>
      <input type="submit" value="Buscar" />
    </Container>
  );
};

export default SearchScreen;
