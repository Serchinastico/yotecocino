import React, {useState} from "react";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useHistory} from "react-router-dom";
import dayjs from "dayjs";
import {Service} from "foundation/types/Service";
import LocationInput from "../ui/LocationInput";
import {RichLocation} from "../../core/places/ConvertLocationToCoords";

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

const CookOfferScreen: React.FC = () => {
    const history = useHistory();
    const [address, setAddress] = useState<string | null>(null);
    const [location, setLocation] = useState<RichLocation | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [service, setService] = useState<Service | null>(null);

    const onFormSubmit = () => {
        const latitude = location?.lat
        const longitude = location?.long
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
            <LocationInput address={address} setAddress={setAddress} setLocation={setLocation} showMap={true}/>
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
            <input type="submit" value="Buscar"/>
        </Container>
    );
};

export default CookOfferScreen;
