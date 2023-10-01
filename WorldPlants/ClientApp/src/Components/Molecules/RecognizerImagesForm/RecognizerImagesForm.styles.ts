import styled from "styled-components";
import { RedActionButton } from "../../Atoms/Buttons/Buttons";

interface Props {
  $imageUrl: string;
}

export const RecognizerImagesFormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  background-color: ${(props) => props.theme.colors.navyBlue};
  border-radius: 25px;
  padding: 30px 25px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  row-gap: 15px;
  flex-direction: column;
`;

export const AddedImagesWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 220px);
  gap: 30px;
  list-style: none;
  padding: 0;
  justify-content: center;
  li:has(div) + :not(:first-child) div {
    display: none;
  }
`;

export const RemoveImageButton = styled(RedActionButton)`
  opacity: 0;
`;

export const AddedImageField = styled.li<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 220px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.purple};
  background-image: url(${(props) => props.$imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid transparent;
  outline: none;
  transition: all 0.5s;
  &:hover:has(button),
  &:focus-within:has(button) {
    border: 2px solid ${(props) => props.theme.colors.orange};
    ${RemoveImageButton} {
      opacity: 1;
    }
  }
`;
