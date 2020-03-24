import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
    CenterDiv,
    Container,
    Emphasis,
    Link,
    FoodNameTitle,
    Text
} from "../ui/StyledForm";

type CreatedFoodOfferScreenProps = {
    match?: any
}

const CreatedFoodOfferScreen: React.FC<CreatedFoodOfferScreenProps> = (props: CreatedFoodOfferScreenProps) => {
    console.log(props);
    return (
        <Container>
            <CenterDiv>
                <Text>
                    <Emphasis>¡Enhorabuena!</Emphasis>
                </Text>
                <Text>
                    Tu ayuda ha quedado registrada.
                    Cuando acuerdes a quién se la darás, tan solo tienes que visitar <Link
                    href={"http://yotecocino.com"}>
                    yotecocino.com</Link> para marcarla como asignada.
                </Text>
                < Text>
                    El identificador de tu comida es:</Text>
                <FoodNameTitle>
                    {props.match.params.foodId}
                </FoodNameTitle>
            </CenterDiv>
        </Container>
    )
        ;
};

export default CreatedFoodOfferScreen;
