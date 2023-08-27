import { PLantsDetailsDto } from "../../../Interfaces/PlantDetailsDto";
import PlantDetailWithIcon from "../PlantDetailWithIcon/PlantDetailWithIcon";
import { PlantDetailsWithIconsSectionWrapper } from "./PlantDetailsWithIconsSection.styles";
import WarningIcon from "../../../Assets/WarningSign.png";
import { translateSunScaleValue } from "../../../Utils/Utils";

interface Props {
  plantDetails: PLantsDetailsDto;
}
const PlantDetailsWithIconsSection = (props: Props) => {
  const { plantDetails } = props;
  return (
    <PlantDetailsWithIconsSectionWrapper>
      <PlantDetailWithIcon
        icon={""}
        title={"Rodzaj"}
        value={plantDetails.plantType}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Cykl życia"}
        value={plantDetails.lifeCycle}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Stanowisko"}
        value={translateSunScaleValue(plantDetails.sunlight).join(", ")}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Pora podlewania"}
        value={plantDetails.wateringPeriod}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Częstotliwość podlewania"}
        value={
          plantDetails.wateringGeneralBenchmark
            ? `${plantDetails.wateringGeneralBenchmark?.value} ${plantDetails.wateringGeneralBenchmark?.unit}`
            : null
        }
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Średnia wysokość"}
        value={`${plantDetails.averageHeight} cm`}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Przyrost"}
        value={plantDetails.growthRate}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Miesiące przycinania"}
        value={plantDetails.pruningMonth.join(", ")}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Częstotliwośc przycinania"}
        value={
          plantDetails.pruningCount
            ? `${plantDetails.pruningCount.amount} ${
                plantDetails.pruningCount.amount === 1 ? "raz" : "razy"
              } ${plantDetails.pruningCount.interval}`
            : null
        }
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Poziom opieki"}
        value={plantDetails.careLevel}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Okres kwitnienia"}
        value={plantDetails.floweringSeason}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Owoce"}
        value={plantDetails.fruits ? "Tak" : false}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Jadalne owoce"}
        value={plantDetails.edibleFruits ? "Tak" : false}
      />
      <PlantDetailWithIcon
        icon={""}
        title={"Okres zbiorów"}
        value={plantDetails.harvestSeason}
      />
      <PlantDetailWithIcon
        icon={""}
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
