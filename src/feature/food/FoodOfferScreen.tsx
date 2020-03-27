import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import LocationInput from "../ui/LocationInput";
import { Coordinates } from "../../foundation/types/Coordinates";
import Alert from "@material-ui/lab/Alert";
import {
  CheckboxContainer,
  CheckboxInput,
  Container,
  FieldErrorDescription,
  InputTitle,
  TextInput,
  Title,
  HorizontalButtons,
  InputHint
} from "../ui/StyledForm";
import { FoodOffer } from "../../foundation/types/FoodOffer";
import SaveFood from "../../foundation/food/SaveFood";
import { useHistory } from "react-router-dom";
import { FooterLink } from "feature/ui/StyledFooter";
import SubmitButton from "../ui/SubmitButton";
import SecondaryButton from "../ui/SecondaryButton";
import { Snackbar } from "@material-ui/core";
import styled from "styled-components";
import HomeButton from "feature/ui/HomeButton";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
`;

const FoodOfferScreen: React.FC = () => {
  const history = useHistory();
  const saveFood = new SaveFood();
  const [contact, setContact] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [description, setDescripiton] = useState<string | null>(null);
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
    if (!contact) {
      violations["contact"] =
        "Necesitamos que nos digas cómo podemos contactar contigo";
    }
    if (!description) {
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
        contact: contact as string,
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

  const containsValidData = Object.keys(validateForm()).length === 0;

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
      <HomeButton />
      <Container onSubmit={onFormSubmit}>
        <Title>
          Completa los siguientes campos para ofrecer una comida preparada. Si
          hay alguien interesado, se pondrán en contacto contigo.
        </Title>
        <LocationInput
          label="¿Dónde será la recogida?"
          setLocation={setLocation}
          hint="Puede ser una dirección aproximada"
          showMap={false}
          errorMessage={violations.location}
        />
        <label>
          <InputTitle>¿Qué podrías cocinar?</InputTitle>
          {descriptionError}
          <InputContainer>
            <TextInput
              type="text"
              placeholder="Comida vegana, guisos riquisimos, platos sin gluten..."
              value={description ?? ""}
              onChange={event => setDescripiton(event.target.value)}
            />
          </InputContainer>
        </label>
        <label>
          <InputTitle>
            Forma de contacto{" "}
            <InputHint>Recuerda que esta información será pública</InputHint>
          </InputTitle>
          {contactError}
          <InputContainer>
            <TextInput
              type="text"
              placeholder="Usuario de Twitter o nº de teléfono"
              value={contact ?? ""}
              onChange={event => setContact(event.target.value)}
            />
          </InputContainer>
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
            label="Finalizar"
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
