import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Footer from "feature/ui/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 3rem;
  font-family: "Pacifico", cursive;
  color: #303240;
  margin-top: 32px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    top: unset;
    left: unset;
    transform: unset;
    margin-top: 24px;
    margin-bottom: 128px;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  height: 320px;
  width: 256px;
  margin: 40px;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const OptionTitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
  position: relative;
  font-weight: 600;
  top: 32px;
`;

const OptionIllustration = styled.img`
  position: relative;
  bottom: 39px;
  justify-self: flex-end;
`;

const WelcomeScreen: React.FC = () => {
  const history = useHistory();

  const AcceptFoodButton = () => {
    return (
      <OptionContainer onClick={() => history.push("/search")}>
        <OptionTitle>Acepto comida</OptionTitle>
        <OptionIllustration src={"img/il_doctor.svg"} />
      </OptionContainer>
    );
  };

  const ProvideFoodButton = () => {
    return (
      <OptionContainer onClick={() => history.push("/cook")}>
        <OptionTitle>Ofrezco comida</OptionTitle>
        <OptionIllustration src={"img/il_chef.svg"} />
      </OptionContainer>
    );
  };

  return (
    <Container>
      <Title>#yotecocino</Title>
      <OptionsContainer>
        <AcceptFoodButton />
        <ProvideFoodButton />
      </OptionsContainer>
      <Footer />
    </Container>
  );
};

export default WelcomeScreen;
