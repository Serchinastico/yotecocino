import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {useHistory} from "react-router-dom";
import dayjs from "dayjs";
import {Service} from "foundation/types/Service";
import LocationInput from "../ui/LocationInput";
import {RichLocation} from "../../core/places/ConvertLocationToCoords";
import {ButtonInput, Container, DateInput, InputTitle, RadioInput, TextInput, Title} from "../ui/StyledForm";

const CookOfferScreen: React.FC = () => {
    const history = useHistory();
    const [contact, setContact] = useState<string | null>(null);
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
            <Title>
                Completa los siguientes campos para ofrecer una comida preparada
            </Title>
            <label>
                <InputTitle>¿Qué día será la recogida?</InputTitle>
                <DateInput
                    placeholderText="Selecciona el día"
                    selected={date}
                    onChange={date => setDate(date)}
                    minDate={new Date()}
                />
            </label>
            <LocationInput setLocation={setLocation}/>
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
            <label>
                <InputTitle>Forma de contacto</InputTitle>
                <TextInput
                    type="text"
                    placeholder="Twitter, Instagram, email, teléfono"
                    value={contact ?? ""}
                    onChange={event => setContact(event.target.value)}
                />
            </label>
            <ButtonInput type="submit" value="Cocinar" />
        </Container>
    );
};

export default CookOfferScreen;
