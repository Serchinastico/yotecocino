import React from "react";

import {FullWidthCentered, FullWidthContainer, Text, Title} from "../ui/StyledForm";
import YoTeCocinoLogo from "../ui/YoTeCocinoLogo";
import FAQItem, {FAQQuestion} from "./FAQItem";
import HomeButton from "../ui/HomeButton";


type FAQScreenProps = {
  questions: FAQQuestion[]
};

const FAQScreen: React.FC<FAQScreenProps> = ({questions}) => {
  return <>
    <HomeButton/>

    <FullWidthContainer>
      <Title>FAQ: Preguntas Frecuentes</Title>

      <Text>Hemos preparado <a href="/how.pdf">un documento</a> que explica cómo
        funciona <YoTeCocinoLogo/>. Si no lo has hecho ya, te recomendamos que le <a
          href="/how.pdf">eches un vistazo</a>.</Text>
      <FullWidthCentered>
        {questions.map((entry) => <FAQItem {...entry}/>)}
      </FullWidthCentered>
    </FullWidthContainer>;
  </>
}

export default FAQScreen;