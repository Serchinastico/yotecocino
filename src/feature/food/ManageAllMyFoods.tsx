import React, {useState} from "react";

import {
    ButtonInput,
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

const ManageAllMyFoods: React.FC = () => {
    const findAllMyFood = new FindOfferedFoods();
    const removeFood = new RemoveFood();

    const [saving, setSaving] = useState<boolean>(false);
    const [offeredFood, setOfferedFood] = useState<FoodOffer[]>([]);
    const [foodId, setFoodId] = useState<string | null>(null);
    const [needToLoadMyFoods, setNeedToLoadMyFoods] = useState<boolean>(true);

    React.useEffect(() => {
        if (needToLoadMyFoods) {
            findAllMyFood.execute().then(setOfferedFood);
            setNeedToLoadMyFoods(false);
        }
    });

    const deleteFood = (event: any) => {
        event.preventDefault();
        setSaving(true);
        removeFood.execute(foodId || "").then(() => {
            setSaving(false);
            setFoodId(null);
            setNeedToLoadMyFoods(true);
        });
    }

    const deleteText = saving ? "Eliminando" : "Eliminar";

    const createdFoodList = (<div>
        <Text>
            O puedes elegir uno de los que ya has creado en este dispositivo:
        </Text>
        <div>
            {offeredFood.map((food) => {
                const myFoodId = food.food || "";
                const onClick = () => {
                    setFoodId(myFoodId);
                };
                return <MyCreatedFoodItem onClick={onClick}>{myFoodId}</MyCreatedFoodItem>
            })}
        </div>
    </div>);

    const list = offeredFood.length > 0 ? createdFoodList : null;



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
        <ButtonInput type="submit" value={deleteText}/>

    </Container>
}

export default ManageAllMyFoods;