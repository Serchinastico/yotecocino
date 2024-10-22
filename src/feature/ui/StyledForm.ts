import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 32px;
  position: relative;
  padding: 32px;
  margin: 64px auto;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
`;


export const FullWidthContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 65px auto;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 32px;
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
  width: 100%;
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

export const Title = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 16px;
`;

export const Text = styled.p`
  font-weight: light;
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
`;

export const MyCreatedFoodItem = styled.p`
  font-weight: lighter;
  padding: 0;
  padding-left: 24px;
  margin: 0;
  padding-top: 12px;
  padding-bottom: 12px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

export const Warning = styled.p`
  font-weight: 500;
  padding: 0;
  margin: 0;
  margin-bottom: 4px;
  margin-top: 16px;
  text-align: center;
`;

export const OptionsContainer = styled.div`
  margin-top: 16px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`;

export const HorizontalButtons = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: space-between;
`;


export const FullWidthCentered = styled.div`
  display: block;
  width: 100%;
  margin: 25px auto;
`
