import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {Service} from "foundation/types/Service";
import LocationInput from "../ui/LocationInput";
import {Coordinates} from "../../foundation/types/Coordinates";
import {
    ButtonInput,
    Container,
    DateInput,
    FieldErrorDescription,
    InputTitle,
    RadioInput,
    TextInput,
    Title
} from "../ui/StyledForm";
import {FoodOffer} from "../../foundation/types/FoodOffer";
import SaveFood from "../../foundation/food/SaveFood";
import {useHistory} from "react-router-dom";

const FoodOfferScreen: React.FC = () => {
    const history = useHistory();
    const saveFood = new SaveFood();
    const [contact, setContact] = useState<string | null>(null);
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [service, setService] = useState<Service | null>(null);
    const [violations, setViolations] = useState<any>({});
    const [saving, setSaving] = useState<boolean>(false);

    const validateForm = () => {
        let violations: any = {};
        if (!location) {
            violations["location"] = "Necesitamos que nos digas dónde se recogerá la comida";
        }
        if (!date) {
            violations["date"] = "Necesitamos que nos digas cuándo se recogerá la comida";
        }
        if (!contact) {
            violations["contact"] = "Necesitamos que nos digas cómo podemos contactar contigo";
        }
        if (!service) {
            violations["service"] = "Necesitamos que nos digas si ofreces comida o cena";
        }
        return violations;
    }

    const onFormSubmit = (event: any) => {
        event.preventDefault();
        console.log("test");
        const violations = validateForm();
        if (Object.keys(violations).length !== 0) {
            setViolations(violations);
        } else {
            setSaving(true);
            const foodOffer: FoodOffer = {
                coordinates: location as Coordinates,
                service: service as Service,
                contact: contact as string,
                date: dayjs(date || Date()).format("YYYY-MM-DD")
            }

            saveFood.execute(foodOffer).then((savdeFood) => {
                setSaving(false);
                history.push(`/food/${savdeFood.food}`)
            });
        }
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

    const locationError = violations.location ? <FieldErrorDescription>{violations.location}</FieldErrorDescription> : null;
    const dateError = violations.date ? <FieldErrorDescription>{violations.date}</FieldErrorDescription> : null;
    const serviceError = violations.service ? <FieldErrorDescription>{violations.service}</FieldErrorDescription> : null;
    const contactError = violations.contact ? <FieldErrorDescription>{violations.contact}</FieldErrorDescription> : null;
    const saveText = saving ? "Guardando tu solicitud" : "Cocinar";

    return (
        <Container onSubmit={onFormSubmit}>
            <Title>
                Completa los siguientes campos para ofrecer una comida preparada
            </Title>
            {locationError}
            <LocationInput setLocation={setLocation} showMap={false}/>
            <label>
                <InputTitle>¿Qué día será la recogida?</InputTitle>
                {dateError}
                <DateInput
                    placeholderText="Selecciona el día"
                    selected={date}
                    onChange={date => setDate(date)}
                    minDate={new Date()}
                />
            </label>
            <label>
                <InputTitle>¿Comida o cena?</InputTitle>
                {serviceError}
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
                {contactError}
                <TextInput
                    type="text"
                    placeholder="Twitter, Instagram, email, teléfono"
                    value={contact ?? ""}
                    onChange={event => setContact(event.target.value)}
                />
            </label>
            <ButtonInput type="submit" value={saveText} />
        </Container>
    );
};

export default FoodOfferScreen;
