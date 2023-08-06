import { useRef } from "react";
import {
  HiddenCheckbox,
  InputDot,
  ToggleDotWrapper,
  ToggleInputWrapper,
  ToggleLabel,
  ToggleLabelText,
} from "./ToggleInput.styles";

interface Props {
  toggle: (id: string, newStatus: boolean) => void;
  isActive: boolean;
  id: string;
}

const ToggleInput = (props: Props) => {
  const { toggle, isActive, id } = props;
  const checkbox = useRef<HTMLInputElement>(null);

  return (
    <ToggleInputWrapper>
      <ToggleLabel>
        <ToggleLabelText checked={isActive}>
          {isActive ? "Aktywny" : "Nieaktywny"}
        </ToggleLabelText>
        <ToggleDotWrapper>
          <InputDot checked={isActive} />
          <HiddenCheckbox
            type="checkbox"
            ref={checkbox}
            defaultChecked={isActive}
            onClick={() => toggle(id, !!checkbox.current?.checked)}
          />
        </ToggleDotWrapper>
      </ToggleLabel>
    </ToggleInputWrapper>
  );
};

export default ToggleInput;
