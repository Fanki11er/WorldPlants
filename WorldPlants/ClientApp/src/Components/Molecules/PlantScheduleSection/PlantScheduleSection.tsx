import { useParams } from "react-router-dom";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import { PlantScheduleSectionWrapper } from "./PlantScheduleSection.styles";
import { useQuery } from "react-query";
import { PLANTS_SCHEDULE_TIPS } from "../../../Constants/Constants";
import { PlantScheduleTipsDto } from "../../../Interfaces/PlantScheduleTipsDto";
import PlantScheduleTip from "../PlantScheduleTip/PlantScheduleTip";
import PlantStandardTaskScheduleForm from "../PlantStandardTaskScheduleForm/PlantStandardTaskScheduleForm";
import { StandardTaskTypeEnum } from "../../../Interfaces/PlantActiveTask";
import dropsOfWater from "../../../Assets/WateringsThree.svg";
import flowerPot from "../../../Assets/Fertilizer.svg";
import scissors from "../../../Assets/Pruning.svg";
import transplantation from "../../../Assets/Transplantation.svg";
import mist from "../../../Assets/Wetting2.svg";
import PlantScheduleConcreteType from "../PlantScheduleConcreteType/PlantScheduleConcreteType";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { CustomActionTypeInformation } from "../../../Interfaces/CustomActionTypeInformation";
import useGetCustomActionTypes from "../../../Hooks/useGetCustomActionTypes";
import customActionTypeIcon from "../../../Assets/CustomActionType2.svg";
import GoToTop from "../GoToTop/GoToTop";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";

const PlantScheduleSection = () => {
  const { plantId } = useParams();
  const { getPlantTipsData } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const {
    customActionsTypes,
    customActionTypesAreLoading,
    customActionTypesError,
  } = useGetCustomActionTypes();

  const { data: tipsData } = useQuery<PlantScheduleTipsDto>(
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

  const renderCustomActionTypes = (
    customTypes: CustomActionTypeInformation[]
  ) => {
    return customTypes.map((customType) => {
      return (
        <PlantScheduleConcreteType
          key={customType.id}
          description={customType.description}
          iconSrc={customActionTypeIcon}
          iconAlt={"Ikona zadania"}
          taskId={customType.id}
        />
      );
    });
  };
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <PlantScheduleConcreteType
        description="Podlewanie"
        iconSrc={dropsOfWater}
        iconAlt={"Ikona z kroplami wody"}
        taskId={StandardTaskTypeEnum.Water}
        tipData={tipsData?.watering && tipsData.watering}
      />
      <PlantScheduleConcreteType
        description="Nawożenie"
        iconSrc={flowerPot}
        iconAlt={"Ikona z doniczką"}
        taskId={StandardTaskTypeEnum.Fertilize}
      />
      <PlantScheduleConcreteType
        description="Przycinanie"
        iconSrc={scissors}
        iconAlt={"Ikona nożyczkami"}
        taskId={StandardTaskTypeEnum.Cut}
        tipData={tipsData?.pruning && tipsData.pruning}
      />
      <PlantScheduleConcreteType
        description="Przesadzanie"
        iconSrc={transplantation}
        iconAlt={"Ikona z doniczką"}
        taskId={StandardTaskTypeEnum.Replant}
      />

      <PlantScheduleConcreteType
        description="Zraszanie"
        iconSrc={mist}
        iconAlt={"Ikona z doniczką"}
        taskId={StandardTaskTypeEnum.Mist}
      />
      {customActionTypesAreLoading && <LoadingIndicator />}
      {customActionTypesError ? (
        <FormRequestError
          errorValues={getErrorMessages(customActionTypesError)}
        />
      ) : null}
      {customActionsTypes && renderCustomActionTypes(customActionsTypes)}
    </SettingsSectionWrapper>
  );
};

export default PlantScheduleSection;
