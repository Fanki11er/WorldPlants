import { ActionButton } from "../../Atoms/Buttons/Buttons";
import {
  CenterButtonWrapper,
  FormControlsWrapper,
  LeftButtonWrapper,
  RightButtonWrapper,
} from "./FormControls.styles";

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
        <LeftButtonWrapper>
          <ActionButton
            disabled={disabledBack}
            onClick={moveBack}
            type="button"
          >
            Powrót
          </ActionButton>
        </LeftButtonWrapper>
      )}

      <CenterButtonWrapper>
        <ActionButton disabled={disableSubmit} type="submit">
          Zapisz
        </ActionButton>
      </CenterButtonWrapper>
      {moveForward && (
        <RightButtonWrapper>
          <ActionButton
            disabled={disabledForward}
            onClick={moveForward}
            type="button"
          >
            Dalej
          </ActionButton>
        </RightButtonWrapper>
      )}
    </FormControlsWrapper>
  );
};

export default FormControls;
