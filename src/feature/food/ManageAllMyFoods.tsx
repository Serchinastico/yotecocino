import React, {useState} from "react";

import {
  Container,
  MyCreatedFoodItem,
  InputTitle,
  Text,
  TextInput,
  Title,

} from "../ui/StyledForm";
import FindOfferedFoods from "../../foundation/food/FindOfferedFoods";
import {FoodOffer} from "../../foundation/types/FoodOffer";
import RemoveFood from "../../foundation/food/RemoveFood";
import {Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SubmitButton from "../ui/SubmitButton";

const ManageAllMyFoods: React.FC = () => {
  const findAllMyFood = new FindOfferedFoods();
  const removeFood = new RemoveFood();

  const [saving, setSaving] = useState<boolean>(false);
  const [offeredFood, setOfferedFood] = useState<FoodOffer[]>([]);
  const [foodId, setFoodId] = useState<string | null>(null);
  const [needToLoadMyFoods, setNeedToLoadMyFoods] = useState<boolean>(true);
  const [showError, setShowError] = useState(false);

  React.useEffect(() => {
    if (needToLoadMyFoods) {
      findAllMyFood.execute().then(setOfferedFood);
      setNeedToLoadMyFoods(false);
    }
  });

  const deleteFood = (event: any) => {
    event.preventDefault();
    setSaving(true);
    removeFood.execute(foodId || "").then(success => {
      setSaving(false);
      if (!success) {
        setShowError(true)
      } else {
        setFoodId(null);
        setNeedToLoadMyFoods(true);
      }
    }).catch(() => {
        setSaving(false);
        setShowError(true)
    });
  }
  const createdFoodList = (<div>
    <Text>
      O puedes elegir uno de los que ya has creado en este dispositivo:
    </Text>
    <div>
      {offeredFood.map((food) => {
        const onClick = () => {
          setFoodId(food.id || "");
        };
        return <MyCreatedFoodItem onClick={onClick}>{food.food}</MyCreatedFoodItem>
      })}
    </div>
  </div>);

  const list = offeredFood.length > 0 ? createdFoodList : null;
  const nothingToBeDeleted = !foodId;

  return <Container onSubmit={deleteFood}>
    <Title>
      Introduce el identificador de tu comida registrada
    </Title>
    <label>
      <InputTitle>Identificador</InputTitle>
      <TextInput
        type="text"
        placeholder="Ejemplo Cactus"
        value={foodId ?? ""}
        onChange={event => setFoodId(event.target.value)}
      />
    </label>
    {list}
    <Text>
      Recuerda que este paso eliminará de forma permanente la comida registrada. Para hacer modificaciones,
      tendrás que registrar una nueva.
    </Text>
    <SubmitButton
      label="Eliminar"
      loading={saving}
      disabled={nothingToBeDeleted}
      onSubmit={deleteFood}/>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={showError}
      autoHideDuration={4000}
    >
      <Alert onClose={() => setShowError(false)} severity="error">
        ¡Oh no! Algo ha ido mal. Vuelve a intentarlo en un rato.
      </Alert>
    </Snackbar>
  </Container>
}

export default ManageAllMyFoods;