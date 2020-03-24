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
    Link,
    RadioInput,
    Text,
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
    const [description, setDescripiton] = useState<string | null>(null);
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
        if (!service) {
            violations["description"] = "Necesitamos que nos digas que podrías cocinar. Si no sabes que hacer, pon 'cositas ricas'";
        }
        return violations;
    }

    const onFormSubmit = (event: any) => {
        event.preventDefault();
        const violations = validateForm();
        if (Object.keys(violations).length !== 0) {
            setViolations(violations);
        } else {
            setSaving(true);
            const foodOffer: FoodOffer = {
                coordinates: location as Coordinates,
                service: service as Service,
                contact: contact as string,
                date: dayjs(date || Date()).format("YYYY-MM-DD"),
                food: description as string
            }

            saveFood.execute(foodOffer).then((savdeFood) => {
                setSaving(false);
                history.push(`/food/${savdeFood.id}`)
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

    const dateError = violations.date ? <FieldErrorDescription>{violations.date}</FieldErrorDescription> : null;
    const serviceError = violations.service ?
        <FieldErrorDescription>{violations.service}</FieldErrorDescription> : null;
    const contactError = violations.contact ?
        <FieldErrorDescription>{violations.contact}</FieldErrorDescription> : null;
    const descriptionError = violations.description ?
        <FieldErrorDescription>{violations.description}</FieldErrorDescription> : null;

    const saveText = saving ? "Guardando tu solicitud" : "Cocinar";

    return (<div>
            <Container onSubmit={onFormSubmit}>
                <Title>
                    Completa los siguientes campos para ofrecer una comida preparada
                </Title>
                <LocationInput label="¿Dónde será la recogida?"
                               setLocation={setLocation}
                               showMap={false}
                               errorMessage={violations.location}/>
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
                    <InputTitle>¿Qué podrías cocinar?</InputTitle>
                    {descriptionError}
                    <TextInput
                        type="text"
                        placeholder="Comida vegana, guisos riquisimos, ..."
                        value={description ?? ""}
                        onChange={event => setDescripiton(event.target.value)}
                    />
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
                <ButtonInput type="submit" value={saveText}/>

                <Text>Haz clic <Link href="/myFood">aquí</Link> si ya tienes una comida registrada y la quieres
                    borrar</Text>

            </Container>
        </div>
    );
};

export default FoodOfferScreen;
