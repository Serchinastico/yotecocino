import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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

const DescriptionContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 310px;
  height: 400px;
  position: absolute;
  top: 50%;
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

const WorkInProgressScreen: React.FC = () => {
  return (
    <Container>
      <Title>#yotecocino</Title>
      <DescriptionContainer>
        <Description>
          <b>¡Disponible muy pronto!</b> Estamos trabajando muy duro en la web
          para tenerla disponible cuanto antes. Mientras tanto, estamos en
          Twitter con el hashtag:
          <HashTag>#yotecocino</HashTag>
        </Description>
        <Illustration src="img/il_wip.svg"></Illustration>
      </DescriptionContainer>
    </Container>
  );
};

export default WorkInProgressScreen;
