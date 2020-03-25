import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { Service } from "foundation/types/Service";
import LocationInput from "../ui/LocationInput";
import { Coordinates } from "../../foundation/types/Coordinates";
import Alert from "@material-ui/lab/Alert";
import {
  CheckboxContainer,
  CheckboxInput,
  Container,
  DateInput,
  FieldErrorDescription,
  InputTitle,
  RadioInput,
  TextInput,
  Title,
  HorizontalButtons
} from "../ui/StyledForm";
import { FoodOffer } from "../../foundation/types/FoodOffer";
import SaveFood from "../../foundation/food/SaveFood";
import { useHistory } from "react-router-dom";
import { FooterLink } from "feature/ui/StyledFooter";
import SubmitButton from "../ui/SubmitButton";
import SecondaryButton from "../ui/SecondaryButton";
import { Snackbar } from "@material-ui/core";

const FoodOfferScreen: React.FC = () => {
  const history = useHistory();
  const saveFood = new SaveFood();
  const [contact, setContact] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [description, setDescripiton] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState<boolean>(
    false
  );
  const [violations, setViolations] = useState<any>({});
  const [showError, setShowError] = React.useState(false);
  const [saving, setSaving] = useState<boolean>(false);

  const validateForm = () => {
    let violations: any = {};
    if (!location) {
      violations["location"] =
        "Necesitamos que nos digas dónde se recogerá la comida";
    }
    if (!date) {
      violations["date"] =
        "Necesitamos que nos digas cuándo se recogerá la comida";
    }
    if (!contact) {
      violations["contact"] =
        "Necesitamos que nos digas cómo podemos contactar contigo";
    }
    if (!service) {
      violations["service"] =
        "Necesitamos que nos digas si ofreces comida o cena";
    }
    if (!service) {
      violations["description"] =
        "Necesitamos que nos digas que podrías cocinar. Si no sabes que hacer, pon 'cositas ricas'";
    }
    if (!acceptPrivacyPolicy) {
      violations["privacyPolicy"] =
        "Necesitamos que aceptes la política de privacidad";
    }
    return violations;
  };

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
      };

      saveFood.execute(foodOffer).then(savedFood => {
        setSaving(false);
        if (savedFood === undefined) {
          setShowError(true);
        } else {
          history.push(`/food/${savedFood!!.id}`);
        }
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

  const containsValidData = Object.keys(validateForm()).length === 0;

  const dateError = violations.date ? (
    <FieldErrorDescription>{violations.date}</FieldErrorDescription>
  ) : null;
  const serviceError = violations.service ? (
    <FieldErrorDescription>{violations.service}</FieldErrorDescription>
  ) : null;
  const contactError = violations.contact ? (
    <FieldErrorDescription>{violations.contact}</FieldErrorDescription>
  ) : null;
  const descriptionError = violations.description ? (
    <FieldErrorDescription>{violations.description}</FieldErrorDescription>
  ) : null;
  const privacyPolicyError = violations.description ? (
    <FieldErrorDescription>{violations.privacyPolicy}</FieldErrorDescription>
  ) : null;

  return (
    <div>
      <Container onSubmit={onFormSubmit}>
        <Title>
          Completa los siguientes campos para ofrecer una comida preparada
        </Title>
        <LocationInput
          label="¿Dónde será la recogida?"
          setLocation={setLocation}
          showMap={false}
          errorMessage={violations.location}
        />
        <label>
          <InputTitle>¿Qué día será la recogida?</InputTitle>
          {dateError}
          <DateInput
            placeholderText="Selecciona el día"
            selected={date}
            onChange={(date, event) => {
              setDate(date);
              event?.preventDefault();
            }}
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
            placeholder="Twitter"
            value={contact ?? ""}
            onChange={event => setContact(event.target.value)}
          />
        </label>
        <CheckboxContainer>
          {privacyPolicyError}
          <CheckboxInput
            type="checkbox"
            checked={acceptPrivacyPolicy}
            onChange={event => setAcceptPrivacyPolicy(event.target.checked)}
          />
          <label onClick={() => setAcceptPrivacyPolicy(!acceptPrivacyPolicy)}>
            Acepto la{" "}
            <FooterLink href="privacypolicy.html">
              política de privacidad
            </FooterLink>
          </label>
        </CheckboxContainer>
        <HorizontalButtons>
          <SecondaryButton
            label="Ver comida registrada"
            onClick={() => history.push("/myFood")}
          />
          <SubmitButton
            label="Registrar"
            onSubmit={onFormSubmit}
            loading={saving}
            disabled={!containsValidData}
          />
        </HorizontalButtons>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={showError}
          autoHideDuration={4000}
        >
          <Alert onClose={() => setShowError(false)} severity="error">
            ¡Oh no! Algo ha ido mal. Vuelve a intentarlo en un rato.
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default FoodOfferScreen;
