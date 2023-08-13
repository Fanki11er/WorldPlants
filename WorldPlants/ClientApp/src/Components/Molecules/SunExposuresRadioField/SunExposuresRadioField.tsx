import { useField } from "formik";
import {
  DescriptionListWrapper,
  LabelText,
  SunExposureDescription,
  SunExposuresRadioFieldWrapper,
  SunLevelIcon,
} from "./SunExposuresRadioField.styles";
import { SunScale } from "../../../Interfaces/SunExposureDto";
import { selectSunScaleIcon } from "../../../Utils/Utils";
import { HiddenRadioInput } from "../../Atoms/HiddenRadioInput/HiddenRadioInput.styles";

interface Props {
  id: string;
  name: string;
  label: string;
  sunScale: SunScale;
  description: string[];
}

const SunExposuresRadioField = (props: Props) => {
  const { name, label, sunScale, id, description } = props;
  const [field] = useField(name);

  return (
    <SunExposuresRadioFieldWrapper
      $checked={String(field.value === id.toString())}
    >
      <SunLevelIcon src={selectSunScaleIcon(sunScale)} />
      <LabelText>{label}</LabelText>
      <DescriptionListWrapper>
        {description &&
          description.map((text, index) => {
            return (
              <SunExposureDescription key={index}>
                {text}
              </SunExposureDescription>
            );
          })}
      </DescriptionListWrapper>
      <HiddenRadioInput name={name} id={name} value={id} type={"radio"} />
    </SunExposuresRadioFieldWrapper>
  );
};

export default SunExposuresRadioField;
