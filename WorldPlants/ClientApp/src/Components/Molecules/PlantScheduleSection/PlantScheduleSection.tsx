import { useParams } from "react-router-dom";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import {
  PlantScheduleConcreteTypeHeader,
  PlantScheduleConcreteTypeHeaderWrapper,
  PlantScheduleConcreteTypeWrapper,
  PlantScheduleSectionWrapper,
} from "./PlantScheduleSection.styles";
import { useQuery } from "react-query";
import { PLANTS_SCHEDULE_TIPS } from "../../../Constants/Constants";
import noIcon from "../../../assets/NoIcon.svg";
import { PlantScheduleTipsDto } from "../../../Interfaces/PlantScheduleTipsDto";
import PlantScheduleTip from "../PlantScheduleTip/PlantScheduleTip";
import PlantStandardTaskScheduleForm from "../PlantStandardTaskScheduleForm/PlantStandardTaskScheduleForm";
import { StandardTaskTypeEnum } from "../../../Interfaces/PlantActiveTask";
import dropsOfWater from "../../../Assets/WateringsThree.svg";
import flowerPot from "../../../Assets/Fertilizer.svg";
import scissors from "../../../Assets/Pruning.svg";
import transplantation from "../../../Assets/Transplantation.svg";
import mist from "../../../Assets/Wetting2.svg";

const PlantScheduleSection = () => {
  const { plantId } = useParams();
  const { getPlantTipsData } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const {
    data: tipsData,
    isLoading: isTipsDataLoading,
    error: tipsDataError,
  } = useQuery<PlantScheduleTipsDto>(
    [PLANTS_SCHEDULE_TIPS, plantId],
    async () => {
      const result = await axiosPrivate.get(getPlantTipsData(plantId));
      return result.data;
    },
    {
      enabled: !!plantId,
      staleTime: 10000 * 60,
      cacheTime: 10000 * 120,
    }
  );
  return (
    <PlantScheduleSectionWrapper>
      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={dropsOfWater} alt={"Ikona z kroplami wody"} />
          <PlantScheduleConcreteTypeHeader>
            Podlewanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantScheduleTip
          tipData={tipsData?.watering ? tipsData.watering : ""}
        />
        <PlantStandardTaskScheduleForm taskType={StandardTaskTypeEnum.Water} />
      </PlantScheduleConcreteTypeWrapper>

      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={flowerPot} alt={"Ikona z doniczką"} />
          <PlantScheduleConcreteTypeHeader>
            Nawożenie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantStandardTaskScheduleForm
          taskType={StandardTaskTypeEnum.Fertilize}
        />
      </PlantScheduleConcreteTypeWrapper>

      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={scissors} alt={"Ikona nożyczkami"} />
          <PlantScheduleConcreteTypeHeader>
            Przycinanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantScheduleTip tipData={tipsData?.pruning ? tipsData.pruning : ""} />
        <PlantStandardTaskScheduleForm taskType={StandardTaskTypeEnum.Cut} />
      </PlantScheduleConcreteTypeWrapper>
      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={transplantation} alt={"Ikona z doniczką"} />
          <PlantScheduleConcreteTypeHeader>
            Przesadzanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantStandardTaskScheduleForm
          taskType={StandardTaskTypeEnum.Replant}
        />
      </PlantScheduleConcreteTypeWrapper>

      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={mist} alt={"Ikona ze spryskiwaczem"} />
          <PlantScheduleConcreteTypeHeader>
            Zwilżanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantStandardTaskScheduleForm taskType={StandardTaskTypeEnum.Mist} />
      </PlantScheduleConcreteTypeWrapper>
    </PlantScheduleSectionWrapper>
  );
};

export default PlantScheduleSection;
