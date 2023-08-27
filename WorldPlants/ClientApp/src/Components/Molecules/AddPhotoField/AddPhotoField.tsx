import { ChangeEvent } from "react";
import {
  AddPhotoFieldInput,
  AddPhotoFieldLabel,
  AddPhotoFieldWrapper,
} from "./AddPhotoField.styles";

interface Props {
  label: string;
  fieldName: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddPhotoField = (props: Props) => {
  const { label, handleImageChange } = props;

  return (
    <AddPhotoFieldWrapper>
      <AddPhotoFieldLabel>
        {label}
        <AddPhotoFieldInput
          type={"file"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
          accept="image/png, image/jpeg, image/jpg"
        />
      </AddPhotoFieldLabel>
    </AddPhotoFieldWrapper>
  );
};
export default AddPhotoField;
