import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const AcceptOrProvideFoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  border-radius: 16px;
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.2);
  height: 90vh;
  width: 45vw;
  margin: 16px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AcceptOrProvideFoodTitle = styled.p`
  font-size: 2rem;
  line-height: 1.5;
  width: 50%;
`;

const Tag = styled.span`
  background: #c07ee280;
  border: 1px solid #c07ee2ff;
  padding: 4px;
  border-radius: 4px;
`;

const AcceptOrProvideFoodIllustration = styled.img`
  width: 50%;
  height: 50%;
  justify-self: flex-end;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const WelcomeScreen: React.FC = () => {
  const history = useHistory();

  const AcceptFoodOption = () => {
    return (
      <AcceptOrProvideFoodContainer onClick={() => history.push("/search")}>
        <AcceptOrProvideFoodTitle>
          Soy <Tag>personal sanitario</Tag>,{" "}
          <Tag>miembro de los cuerpos policiales</Tag>,{" "}
          <Tag>trabajo en un supermercado</Tag> o, en definitiva, cualquier
          persona que esté trabajando durante estos días.
        </AcceptOrProvideFoodTitle>
        <AcceptOrProvideFoodIllustration src={"img/il_doctor.svg"} />
      </AcceptOrProvideFoodContainer>
    );
  };

  const ProvideFoodOption = () => {
    return (
      <AcceptOrProvideFoodContainer>
        <AcceptOrProvideFoodTitle>
          Me ofrezco a hacer comida para l@s trabajadores.
        </AcceptOrProvideFoodTitle>
        <AcceptOrProvideFoodIllustration src={"img/il_chef.svg"} />
      </AcceptOrProvideFoodContainer>
    );
  };

  return (
    <Container>
      <AcceptFoodOption />
      <ProvideFoodOption />
    </Container>
  );
};

export default WelcomeScreen;
