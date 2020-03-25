import React, { useState, useEffect } from "react";

import {
  Container,
  MyCreatedFoodItem,
  InputTitle,
  OptionsContainer,
  Text,
  TextInput,
  Title,
  Warning,
  HorizontalButtons
} from "../ui/StyledForm";
import FindOfferedFoods from "../../foundation/food/FindOfferedFoods";
import { FoodOffer } from "../../foundation/types/FoodOffer";
import RemoveFood from "../../foundation/food/RemoveFood";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SubmitButton from "../ui/SubmitButton";
import SecondaryButton from "feature/ui/SecondaryButton";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import HomeButton from "feature/ui/HomeButton";
import { Service } from "foundation/types/Service";

const InputContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ManageAllMyFoods: React.FC = () => {
  const findAllMyFood = new FindOfferedFoods();
  const removeFood = new RemoveFood();

  const history = useHistory();
  const [saving, setSaving] = useState<boolean>(false);
  const [offeredFood, setOfferedFood] = useState<FoodOffer[]>([]);
  const [foodId, setFoodId] = useState<string | null>(null);
  const [needToLoadMyFoods, setNeedToLoadMyFoods] = useState<boolean>(true);
  const [showError, setShowError] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (needToLoadMyFoods) {
      findAllMyFood.execute().then(setOfferedFood);
      setNeedToLoadMyFoods(false);
    }
  }, [needToLoadMyFoods, findAllMyFood]);

  const deleteFood = (event: any) => {
    event.preventDefault();
    setSaving(true);
    removeFood
      .execute(foodId || "")
      .then(success => {
        setSaving(false);
        if (!success) {
          setShowError(true);
        } else {
          setFoodId(null);
          setNeedToLoadMyFoods(true);
        }
      })
      .catch(() => {
        setSaving(false);
        setFoodId(null);
        setShowError(true);
      });
  };

  const createdFoodList = (
    <div>
      <Text>
        Puedes elegir uno de los que ya has creado en este dispositivo:
      </Text>
      <OptionsContainer>
        {offeredFood.map(food => {
          const onClick = () => {
            setFoodId(food.id || "");
          };
          const service = food.service === Service.lunch ? "Comida" : "Cena";
          return (
            <MyCreatedFoodItem onClick={onClick}>
              <b>{food.food}</b> • <i>{food.date}</i> • {service}
            </MyCreatedFoodItem>
          );
        })}
      </OptionsContainer>
    </div>
  );

  const list = offeredFood.length > 0 ? createdFoodList : null;
  const nothingToBeDeleted = !foodId;

  return (
    <div>
      <HomeButton />
      <Container onSubmit={deleteFood}>
        <Title>Introduce el identificador de tu comida registrada</Title>
        {list}
        <label>
          <InputTitle>O introducir el identificador de tu comida:</InputTitle>
          <InputContainer>
            <TextInput
              type="text"
              placeholder="e.g. mbqrK6xagwsjbzysVulv"
              value={foodId ?? ""}
              onChange={event => setFoodId(event.target.value)}
            />
          </InputContainer>
        </label>
        <Warning>
          Recuerda que este paso eliminará de forma permanente la comida
          registrada. Para hacer modificaciones, tendrás que registrar una
          nueva.
        </Warning>
        <br />
        <HorizontalButtons>
          <SecondaryButton
            label="Registrar comida"
            onClick={() => history.push("/cook")}
          />
          <SubmitButton
            label="Eliminar"
            loading={saving}
            disabled={nothingToBeDeleted}
            onSubmit={deleteFood}
          />
        </HorizontalButtons>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={showError}
          autoHideDuration={4000}
        >
          <Alert onClose={() => setShowError(false)} severity="error">
            ¡Oh no! Algo ha ido mal. Vuelve a intentarlo en un rato.
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default ManageAllMyFoods;
