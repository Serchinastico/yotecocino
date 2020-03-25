import React from "react";
import { FooterContainer, FooterLink, FooterContent } from "./StyledFooter";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent><b>¡Estamos de pruebas!</b></FooterContent>
      <FooterContent>
        Creado con mucho{" "}
        <span role="img" aria-label="amor">
          ❤️
        </span>{" "}
        por{" "}
        <FooterLink href="https://twitter.com/Serchinastico">
          @Serchinastico
        </FooterLink>
        , <FooterLink href="https://twitter.com/delr3ves">@delr3ves</FooterLink>{" "}
        y{" "}
        <FooterLink href="https://www.linkedin.com/in/aliciacarbajalzapater/">
          @alicarbajal
        </FooterLink>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
