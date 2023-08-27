import { Watering } from "../../../Interfaces/PlantDetailsDto";
import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import imgLowWater from "../../../Assets/WateringsOne.svg";
import imgHighWater from "../../../Assets/WateringsThree.svg";
import imgMediumWater from "../../../Assets/WateringsTwo.svg";

interface Props {
  wateringLevel: Watering;
}

const WateringIcon = (props: Props) => {
  const { wateringLevel } = props;

  const switchIcon = (wateringLevel: Watering) => {
    switch (wateringLevel) {
      case "Low": {
        return <PlantInfoIcon src={imgLowWater} alt="Ikona jedna kropla" />;
      }
      case "High": {
        return <PlantInfoIcon src={imgHighWater} alt="Ikona trzy krople" />;
      }
      default: {
        return <PlantInfoIcon src={imgMediumWater} alt="Ikona dwie krople" />;
      }
    }
  };

  return <>{switchIcon(wateringLevel)}</>;
};

export default WateringIcon;
