import { useField } from "formik";
import {
  LabelText,
  RadioInputFieldWrapper,
  SiteIcon,
} from "./RadioInputField.styles";
import placeInside from "../../../assets/PlaceHouse.svg";
import placeOutside from "../../../assets/Sun.svg";
import { Location } from "../../../Interfaces/DefaultSiteDto";
import { HiddenRadioInput } from "../../Atoms/HiddenRadioInput/HiddenRadioInput.styles";

interface Props {
  name: string;
  label: string;
  location: Location;
  id: string;
}

const RadioInputField = (props: Props) => {
  const { name, label, location, id } = props;
  const [field] = useField(name);
  return (
    <RadioInputFieldWrapper $checked={String(field.value === id.toString())}>
      <LabelText>{label}</LabelText>
      <SiteIcon src={location === "Indoor" ? placeInside : placeOutside} />
      <HiddenRadioInput name={name} id={name} value={id} type={"radio"} />
    </RadioInputFieldWrapper>
  );
};

export default RadioInputField;
