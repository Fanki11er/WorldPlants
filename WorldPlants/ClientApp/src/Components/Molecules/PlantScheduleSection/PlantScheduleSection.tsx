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
          <PlantInfoIcon src={noIcon} alt={"Ikona z kroplami wody"} />
          <PlantScheduleConcreteTypeHeader>
            Podlewanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantScheduleTip
          error={tipsDataError}
          isLoading={isTipsDataLoading}
          tipData={tipsData?.watering ? tipsData.watering : ""}
        />
        <PlantStandardTaskScheduleForm
          taskType={StandardTaskTypeEnum.Fertilize}
        />
      </PlantScheduleConcreteTypeWrapper>

      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={noIcon} alt={"Ikona z doniczką"} />
          <PlantScheduleConcreteTypeHeader>
            Nawożenie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantStandardTaskScheduleForm taskType={"Fertilize"} />
      </PlantScheduleConcreteTypeWrapper>

      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={noIcon} alt={"Ikona nożyczkami"} />
          <PlantScheduleConcreteTypeHeader>
            Przycinanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantScheduleTip
          error={tipsDataError}
          isLoading={isTipsDataLoading}
          tipData={tipsData?.pruning ? tipsData.pruning : ""}
        />
        <PlantStandardTaskScheduleForm taskType={"Cut"} />
      </PlantScheduleConcreteTypeWrapper>
      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={noIcon} alt={"Ikona z doniczką"} />
          <PlantScheduleConcreteTypeHeader>
            Przesadzanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantStandardTaskScheduleForm taskType={"Replant"} />
      </PlantScheduleConcreteTypeWrapper>

      <PlantScheduleConcreteTypeWrapper>
        <PlantScheduleConcreteTypeHeaderWrapper>
          <PlantInfoIcon src={noIcon} alt={"Ikona ze spryskiwaczem"} />
          <PlantScheduleConcreteTypeHeader>
            Zwilżanie
          </PlantScheduleConcreteTypeHeader>
        </PlantScheduleConcreteTypeHeaderWrapper>
        <PlantStandardTaskScheduleForm taskType={"Mist"} />
      </PlantScheduleConcreteTypeWrapper>
    </PlantScheduleSectionWrapper>
  );
};

export default PlantScheduleSection;
