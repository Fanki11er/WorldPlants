import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import noIcon from "../../../Assets/NoIcon.svg";

import {
  PLantDetailWithIconTitle,
  PLantDetailWithIconValue,
  PlantDetailWithIconWrapper,
} from "./PlantDetailWithIcon.styles";

interface Props {
  icon: string | undefined;
  title: string;
  value: string | number | boolean | null;
}

const PlantDetailWithIcon = (props: Props) => {
  const { icon, title, value } = props;

  if (!value) {
    return null;
  }

  return (
    <PlantDetailWithIconWrapper>
      <PlantInfoIcon src={icon ? icon : noIcon} alt={`Ikona ${title}`} />
      <PLantDetailWithIconTitle>{`${title}: `}</PLantDetailWithIconTitle>
      <PLantDetailWithIconValue>{value}</PLantDetailWithIconValue>
    </PlantDetailWithIconWrapper>
  );
};

export default PlantDetailWithIcon;
