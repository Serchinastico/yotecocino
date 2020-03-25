import React from "react";
import { FooterContainer, FooterLink, FooterContent } from "./StyledFooter";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        Lee nuestra{" "}
        <FooterLink href="privacypolicy.html">
          política de privacidad
        </FooterLink>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
