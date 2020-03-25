import styled from "styled-components";
import ReactDatePicker from "react-datepicker";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: #ffffff;
  border-radius: 32px;
  position: fixed;
  padding: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  overflow: scroll;
`;

export const InputTitle = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
`;

export const InputHint = styled.span`
  color: #9c9c9c;
  font-size: 0.9rem;
`;

export const FieldErrorDescription = styled.p`
  font-size: 0.7rem;
  color: #e27861;
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 5px;
`;

export const TextInput = styled.input`
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  height: 40px;
  width: 470px;
  border-radius: 24px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 0.9rem;
  margin-top: 8px;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    font-family: "Montserrat", sans-serif;
  }
`;

export const CheckboxContainer = styled.label`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  margin-top: 4px;
  margin-right: 24px;
`;

export const DateInput = styled(ReactDatePicker)`
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  height: 40px;
  width: 470px;
  border-radius: 24px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 0.9rem;
  margin-top: 8px;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    font-family: "Montserrat", sans-serif;
  }
`;

export const RadioInput = styled.input`
  padding: 16px;
  margin: 16px;
  font-size: 1rem;
`;

export const ButtonInput = styled.input`
  background: #e27861;
  padding: 16px;
  margin-top: 16px;
  border-radius: 48px;
  border: none;
  width: 45%;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  align-self: flex-end;

  &:disabled {
    background: #ccc;
  }
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 16px;
`;

export const CenterDiv = styled.div`
  text-align: center;
`;

export const Text = styled.p`
  font-weight: light;
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
`;

export const Link = styled.a`
  font-weight: light;
  font-family: "Pacifico", sans-serif;
  text-decoration: none;
  color: #000;
`;

export const MyCreatedFoodItem = styled.p`
  font-weight: lighter;
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
  padding-bottom: 10px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
