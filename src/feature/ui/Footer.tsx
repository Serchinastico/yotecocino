import React from "react";
import { CreatorsDiv, Creator, Creators } from "./StyledFooter";

const Footer: React.FC = () => {
  return (
    <CreatorsDiv>
      <Creators>
        Creado con mucho{" "}
        <span role="img" aria-label="amor">
          ❤️
        </span>{" "}
        por{" "}
        <Creator href="https://twitter.com/Serchinastico">
          @Serchinastico
        </Creator>
        , <Creator href="https://twitter.com/delr3ves">@delr3ves</Creator> y{" "}
        <Creator href="https://www.linkedin.com/in/aliciacarbajalzapater/">
          @alicarbajal
        </Creator>
      </Creators>
    </CreatorsDiv>
  );
};

export default Footer;
