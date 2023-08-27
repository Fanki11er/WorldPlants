import { Sunlight } from "../../../Interfaces/PlantDetailsDto";
import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import imgFullSun from "../../../Assets/Sun.svg";
import imgCloudySun from "../../../Assets/Sun.svg";
import imgShadow from "../../../Assets/Sun.svg";
import imgDarkness from "../../../Assets/Darkness.svg";

interface Props {
  sunlightLevel: Sunlight[];
}

const SunlightIcon = (props: Props) => {
  const { sunlightLevel } = props;

  const switchIcon = (sunlightLevel: Sunlight[]) => {
    if (sunlightLevel.includes("High")) {
      return <PlantInfoIcon src={imgFullSun} alt="Ikona pełna słońca" />;
    } else if (sunlightLevel.includes("Medium")) {
      return <PlantInfoIcon src={imgCloudySun} alt="Ikona słońce za chmurką" />;
    } else if (sunlightLevel.includes("Low")) {
      return <PlantInfoIcon src={imgShadow} alt="Ikona cienia" />;
    } else {
      return <PlantInfoIcon src={imgDarkness} alt="Ikona ciemność" />;
    }
  };

  return <>{switchIcon(sunlightLevel)}</>;
};

export default SunlightIcon;
