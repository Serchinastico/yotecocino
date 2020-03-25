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

const Brand = styled.span`
  font-size: 24px;
  font-family: "Pacifico", cursive;
`;

const Identifier = styled.p`
  font-size: 2rem;
  font-family: "Pacifico", cursive;
  text-align: center;
  color: #2997fc;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Centered = styled.div`
  margin: 20px auto;
`
type CreatedFoodOfferScreenProps = {
  match?: any;
};

const CreatedFoodOfferScreen: React.FC<CreatedFoodOfferScreenProps> = ({
  match
}) => {
  const history = useHistory();

  const shareText = "Acabo de apuntarme al reto de #yotecocino. ¿Te unes?";
  return (
    <div>
      <HomeButton />
      <Container>
        <Congratulations>¡Enhorabuena!</Congratulations>
        <Description>
          Tu ayuda ha quedado registrada. Cuando acuerdes a quién se la darás,
          tan solo tienes que visitar <Brand>#yotecocino</Brand> para marcarla
          como asignada.
        </Description>
        <br />
        <Description>El identificador de tu comida es:</Description>
        <Identifier>{match.params.foodId}</Identifier>

        <Centered>
          <ShareInTwitterButton
            text={shareText}
            label={"compártelo"}
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
