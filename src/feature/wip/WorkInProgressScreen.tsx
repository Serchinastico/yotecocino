import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 310px;
  height: 400px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    margin-top: 60px;
    width: 50%;
  }
`;

const Description = styled.p`
  background: white;
`;

const HashTag = styled.p`
  font-family: "Pacifico", cursive;
  text-align: center;
  font-size: 2rem;
  margin: 0;
`;

const Illustration = styled.img`
  z-index: 10;
  width: 420px;
  height: 410px;
  position: relative;
  bottom: 40px;
  right: 100px;
  @media (max-width: 768px) {
    width: 120%;
    right: 23%;
    bottom: 50px;
  }
  @media (max-width: 320px) {
    width: 140%;
    right: 36%;
    bottom: 100px;
  }
`;

const CreatorsDiv = styled.div`
  background: #fff;
  height: 80px;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px -8px 0px rgba(0, 0, 0, 0.1);
`;
const Creators = styled.p`
  margin: 0;
  text-align: center;
  align-self: center;
`;

const Creator = styled.a`
  text-decoration: none;
  color: #2997fc;
  font-weight: 600;
`;

const WorkInProgressScreen: React.FC = () => {
  return (
    <Container>
      <DescriptionContainer>
        <Description>
          <b>¡Disponible muy pronto!</b> Estamos trabajando muy duro en la web
          para tenerla disponible cuanto antes. Mientras tanto, estamos en
          Twitter con el hashtag:
          <HashTag>#yotecocino</HashTag>
        </Description>
        <Illustration src="img/il_wip.svg"></Illustration>
      </DescriptionContainer>
      <CreatorsDiv>
        <Creators>
          Created with ❤️ by{" "}
          <Creator href="https://twitter.com/Serchinastico">
            @Serchinastico
          </Creator>
          , <Creator href="https://twitter.com/delr3ves">@delr3ves</Creator> y{" "}
          <Creator href="https://www.linkedin.com/in/aliciacarbajalzapater/">
            @alicarbajal
          </Creator>
        </Creators>
      </CreatorsDiv>
    </Container>
  );
};

export default WorkInProgressScreen;
