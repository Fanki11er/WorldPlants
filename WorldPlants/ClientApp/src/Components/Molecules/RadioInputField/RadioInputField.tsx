import { useField } from "formik";
import {
  LabelText,
  RadioInputFieldWrapper,
  SiteIcon,
} from "./RadioInputField.styles";
import placeInside from "../../../Assets/PlaceHouse.svg";
import placeOutside from "../../../Assets/PlaceOutside.svg";
import { Location } from "../../../Interfaces/DefaultSiteDto";
import { HiddenRadioInput } from "../../Atoms/HiddenRadioInput/HiddenRadioInput.styles";

interface Props {
  name: string;
  label: string;
  location: Location;
  id: number;
}

const RadioInputField = (props: Props) => {
  const { name, label, location, id } = props;
  const [field] = useField(name);
  return (
    <RadioInputFieldWrapper $checked={String(field.value === id)}>
      <LabelText>{label}</LabelText>
      <SiteIcon src={location === "Indoor" ? placeInside : placeOutside} />
      <HiddenRadioInput name={name} id={name} value={id} type={"radio"} />
    </RadioInputFieldWrapper>
  );
};

export default RadioInputField;
