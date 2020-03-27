import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SecondaryButton from "feature/ui/SecondaryButton";
import SubmitButton from "feature/ui/SubmitButton";
import { HorizontalButtons, Container } from "feature/ui/StyledForm";
import HomeButton from "feature/ui/HomeButton";
import ShareInTwitterButton from "../ui/ShareInTwitterButton";
import config from "../../foundation/Config";

const Congratulations = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 0;
`;

const Description = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  margin: 8px;
`;

const Footer = styled.div`
  margin-top: 16px;
`;

const Identifier = styled.p`
  font-size: 2rem;
  text-align: center;
  color: #2997fc;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Centered = styled.div`
  margin: 20px auto;
`;
type CreatedFoodOfferScreenProps = {
  match?: any;
};

const CreatedFoodOfferScreen: React.FC<CreatedFoodOfferScreenProps> = ({
  match
}) => {
  const history = useHistory();

  const shareText =
    "¡Acabo de registrar un tupper a través de yotecocino.com! La iniciativa que pone en contacto a sanitarios y otros profesionales en primera línea con cocinillas ¡Únete tú también y pon tu granito de arena!";
  return (
    <div>
      <HomeButton />
      <Container>
        <Congratulations>¡Enhorabuena!</Congratulations>
        <Description>
          Tu ayuda ha quedado registrada. Ahora solo tienes que esperar a que un
          sanitario o algún otro profesional de tu zona te contacten para
          concretar los detalles.
        </Description>
        <br />
        <Description>El identificador de tu comida es:</Description>
        <Identifier>{match.params.foodId}</Identifier>

        <Centered>
          <ShareInTwitterButton
            text={shareText}
            label={"Compártelo"}
            hashtag={config.hashtag}
            url={config.url}
          />
        </Centered>
        <Footer>
          <HorizontalButtons>
            <SecondaryButton
              label="Ver comida registrada"
              onClick={() => history.push("/myFood")}
            />
            <SubmitButton
              label="Registrar otra"
              onClick={() => history.push("/cook")}
              loading={false}
              disabled={false}
            />
          </HorizontalButtons>
        </Footer>
      </Container>
    </div>
  );
};

export default CreatedFoodOfferScreen;
