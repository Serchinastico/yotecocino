import React from "react";

import {
  FullWidthCentered,
  FullWidthContainer,
  Text,
  Title
} from "../ui/StyledForm";
import YoTeCocinoLogo from "../ui/YoTeCocinoLogo";
import FAQItem, { FAQQuestion } from "./FAQItem";
import HomeButton from "../ui/HomeButton";
import { FooterLink } from "feature/ui/StyledFooter";

type FAQScreenProps = {
  questions: FAQQuestion[];
};

const FAQScreen: React.FC<FAQScreenProps> = ({ questions }) => {
  return (
    <>
      <HomeButton />
      <FullWidthContainer>
        <Title>¿Qué es #yotecocino?</Title>

        <Text>
          <YoTeCocinoLogo /> es un movimiento surgido en Twitter para preparar
          comida para la gente que está en primera linea de la lucha contra el
          COVID-19. Tú mismo puedes ayudar apuntándote a cocinar para nuestros
          héroes.
        </Text>

        <Text>
          Hemos preparado <FooterLink href="/how.pdf">un documento</FooterLink>{" "}
          que explica cómo funciona. ¡Te recomendamos que le eches un vistazo!
        </Text>

        <br />

        <Title>Preguntas Frecuentes</Title>
        <FullWidthCentered>
          {questions.map(entry => (
            <FAQItem {...entry} />
          ))}
        </FullWidthCentered>
      </FullWidthContainer>
      ;
    </>
  );
};

export default FAQScreen;
