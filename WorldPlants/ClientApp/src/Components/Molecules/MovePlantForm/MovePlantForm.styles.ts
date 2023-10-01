import { Form } from "formik";
import styled from "styled-components";

interface Active {
  $isButtonActive: boolean;
}

export const MovePlantFormWrapper = styled(Form)`
  width: 100%;
  max-width: 700px;
  display: flex;
  row-gap: 35px;
  flex-direction: column;
  align-items: center;
`;

export const NotSelectedPlaces = styled.div`
  width: 100%;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, 180px);
  gap: 20px;
`;

export const MoveButton = styled.button<Active>`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$isButtonActive
      ? props.theme.colors.purple
      : props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.white};
  column-gap: 10px;
  padding: 5px 20px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  border-radius: 15px;
  border: 2px solid transparent;
  outline: none;
  transition: all 0.5s;
  &:hover,
  &:focus {
    border: 2px solid
      ${(props) =>
        props.$isButtonActive
          ? props.theme.colors.orange
          : props.theme.colors.transparent};

    cursor: ${(props) => (props.$isButtonActive ? "pointer" : "not-allowed")};
  }
`;

export const ButtonIcon = styled.img`
  width: 20px;
`;
