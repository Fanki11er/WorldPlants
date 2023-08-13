import { ActionButton } from "../../Atoms/Buttons/Buttons";
import { FormControlsWrapper } from "./FormControls.styles";

interface Props {
  disabledForward: boolean;
  disabledBack: boolean;
  disableSubmit: boolean;
  moveForward?: () => void;
  moveBack?: () => void;
}

const FormControls = (props: Props) => {
  const {
    disabledForward,
    disabledBack,
    disableSubmit,
    moveForward,
    moveBack,
  } = props;

  return (
    <FormControlsWrapper>
      {moveBack && (
        <ActionButton disabled={disabledBack} onClick={moveBack} type="button">
          Powrót
        </ActionButton>
      )}

      <ActionButton disabled={disableSubmit} type="submit">
        Zapisz
      </ActionButton>
      {moveForward && (
        <ActionButton
          disabled={disabledForward}
          onClick={moveForward}
          type="button"
        >
          Dalej
        </ActionButton>
      )}
    </FormControlsWrapper>
  );
};

export default FormControls;
