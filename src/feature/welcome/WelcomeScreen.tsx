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
  margin-top: 24px;
  margin-bottom: 128px;

  @media (max-width: 768px) {
    flex-direction: column;
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

const HelpContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const HelpLink = styled.a`
  font-size: 1.3rem;
  font-weight: 800;
  color: #2997fc;
  text-decoration: underline;
  padding: 0;
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
      <HelpContainer>
        <HelpLink href="/how.pdf">¿Cómo funciona?</HelpLink>
      </HelpContainer>
      <OptionsContainer>
        <AcceptFoodButton />
        <ProvideFoodButton />
      </OptionsContainer>
      <Footer />
    </Container>
  );
};

export default WelcomeScreen;
