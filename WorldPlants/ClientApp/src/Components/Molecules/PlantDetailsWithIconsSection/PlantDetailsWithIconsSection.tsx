import { PLantsDetailsDto } from "../../../Interfaces/PlantDetailsDto";
import PlantDetailWithIcon from "../PlantDetailWithIcon/PlantDetailWithIcon";
import { PlantDetailsWithIconsSectionWrapper } from "./PlantDetailsWithIconsSection.styles";
import WarningIcon from "../../../Assets/WarningSign.png";
import { translateSunScaleValue } from "../../../Utils/Utils";
import mediumHeight from "../../../Assets/MediumHeight.svg";
import pruningMonths from "../../../Assets/PruningMonths.svg";
import levelOfCare from "../../../Assets/LevelOfCare.svg";
import edibleFruits from "../../../Assets/EdibleFruits.svg";
import fruits from "../../../Assets/Fruits.svg";
import harvestPeriod from "../../../Assets/HarvestPeriod.svg";
import lifeCycle from "../../../Assets/LifeCycle.svg";
import wateringFrequency from "../../../Assets/WateringFrequency.svg";
import growthRate from "../../../Assets/GrowthRate.svg";
import droughtTolerant from "../../../Assets/DroughtTolerant.svg";
import plantType from "../../../Assets/PlantType.svg";
import positionOfThePlants from "../../../Assets/PositionOfThePlants.svg";
import pruningCount from "../../../Assets/PruningCount.svg";
import floweringPeriod from "../../../Assets/FloweringPeriod.svg";
import wateringTime from "../../../Assets/WateringTime.svg";

interface Props {
  plantDetails: PLantsDetailsDto;
}
const PlantDetailsWithIconsSection = (props: Props) => {
  const { plantDetails } = props;
  return (
    <PlantDetailsWithIconsSectionWrapper>
      <PlantDetailWithIcon
        icon={plantType}
        title={"Rodzaj"}
        value={plantDetails.plantType}
      />
      <PlantDetailWithIcon
        icon={lifeCycle}
        title={"Cykl życia"}
        value={plantDetails.lifeCycle}
      />
      <PlantDetailWithIcon
        icon={positionOfThePlants}
        title={"Stanowisko"}
        value={translateSunScaleValue(plantDetails.sunlight).join(", ")}
      />
      <PlantDetailWithIcon
        icon={wateringTime}
        title={"Pora podlewania"}
        value={plantDetails.wateringPeriod}
      />
      <PlantDetailWithIcon
        icon={wateringFrequency}
        title={"Częstotliwość podlewania"}
        value={
          plantDetails.wateringGeneralBenchmark
            ? `${plantDetails.wateringGeneralBenchmark?.value} ${plantDetails.wateringGeneralBenchmark?.unit}`
            : undefined
        }
      />
      <PlantDetailWithIcon
        icon={mediumHeight}
        title={"Średnia wysokość"}
        value={`${plantDetails.averageHeight} cm`}
      />
      <PlantDetailWithIcon
        icon={growthRate}
        title={"Przyrost"}
        value={plantDetails.growthRate}
      />
      <PlantDetailWithIcon
        icon={pruningMonths}
        title={"Miesiące przycinania"}
        value={plantDetails.pruningMonth.join(", ")}
      />
      <PlantDetailWithIcon
        icon={pruningCount}
        title={"Częstotliwość przycinania"}
        value={
          plantDetails.pruningCount
            ? `${plantDetails.pruningCount.amount} ${
                plantDetails.pruningCount.amount === 1 ? "raz" : "razy"
              } ${plantDetails.pruningCount.interval}`
            : undefined
        }
      />
      <PlantDetailWithIcon
        icon={levelOfCare}
        title={"Poziom opieki"}
        value={plantDetails.careLevel}
      />
      <PlantDetailWithIcon
        icon={floweringPeriod}
        title={"Okres kwitnienia"}
        value={plantDetails.floweringSeason}
      />
      <PlantDetailWithIcon
        icon={fruits}
        title={"Owoce"}
        value={plantDetails.fruits ? "Tak" : false}
      />
      <PlantDetailWithIcon
        icon={edibleFruits}
        title={"Jadalne owoce"}
        value={plantDetails.edibleFruits ? "Tak" : false}
      />
      <PlantDetailWithIcon
        icon={harvestPeriod}
        title={"Okres zbiorów"}
        value={plantDetails.harvestSeason}
      />
      <PlantDetailWithIcon
        icon={droughtTolerant}
        title={"Odporna na suszę"}
        value={plantDetails.droughtTolerant ? "Tak" : "Nie"}
      />
      <PlantDetailWithIcon
        icon={WarningIcon}
        title={"Trująca dla ludzi"}
        value={plantDetails.poisonousToHumans ? "Trująca" : false}
      />
      <PlantDetailWithIcon
        icon={WarningIcon}
        title={"Trująca dla zwierząt"}
        value={plantDetails.poisonousToPets ? "Trująca" : false}
      />
      <PlantDetailWithIcon
        icon={WarningIcon}
        title={"Inwazyjna"}
        value={plantDetails.invasive ? "Tak" : false}
      />
    </PlantDetailsWithIconsSectionWrapper>
  );
};

export default PlantDetailsWithIconsSection;
