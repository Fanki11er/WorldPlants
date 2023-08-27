import styled from "styled-components";

export const AddPhotoFieldWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const AddPhotoFieldLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  position: relative;
  width: 180px;
  height: 30px;
  background-color: purple;
`;

export const AddPhotoFieldInput = styled.input`
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
