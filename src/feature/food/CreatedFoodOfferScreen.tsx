import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  background: #fff;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  width: 90%;
  max-width: 500px;
  padding: 100px 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Congratulations = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 0;
`;

const Description = styled.p`
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  margin: 8px;
`;

const Footer = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 24px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #2997fc;
  font-weight: 600;
`;

const Brand = styled.span`
  font-size: 24px;
  font-family: "Pacifico", cursive;
`;

const Identifier = styled.p`
  font-size: 2rem;
  font-family: "Pacifico", cursive;
  text-align: center;
  color: #2997fc;
  margin: 0;
`;

type CreatedFoodOfferScreenProps = {
  match?: any;
};

const CreatedFoodOfferScreen: React.FC<CreatedFoodOfferScreenProps> = ({
  match
}) => {
  const history = useHistory();
  
  return (
    <Container>
      <Congratulations>¡Enhorabuena!</Congratulations>
      <Description>
        Tu ayuda ha quedado registrada. Cuando acuerdes a quién se la darás, tan
        solo tienes que visitar <Brand>#yotecocino</Brand> para marcarla como
        asignada.
      </Description>
      <br />
      <Description>El identificador de tu comida es:</Description>
      <Identifier>{match.params.foodId}</Identifier>
      <Footer>
        Puedes ver tu comida <Link onClick={() => history.push("/myFood")}>aquí</Link>
      </Footer>
    </Container>
  );
};

export default CreatedFoodOfferScreen;
