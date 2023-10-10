import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import noIcon from "../../../Assets/NoIcon.svg";

import {
  PlantDetailWithIconTitle,
  PlantDetailWithIconValue,
  PlantDetailWithIconWrapper,
} from "./PlantDetailWithIcon.styles";

interface Props {
  icon: string | undefined;
  title: string;
  value: string | number | boolean | undefined;
}

const PlantDetailWithIcon = (props: Props) => {
  const { icon, title, value } = props;

  if (!value) {
    return null;
  }

  return (
    <PlantDetailWithIconWrapper>
      <PlantInfoIcon src={icon ? icon : noIcon} alt={`Ikona ${title}`} />
      <PlantDetailWithIconTitle>{`${title}: `}</PlantDetailWithIconTitle>
      <PlantDetailWithIconValue>{value}</PlantDetailWithIconValue>
    </PlantDetailWithIconWrapper>
  );
};

export default PlantDetailWithIcon;
