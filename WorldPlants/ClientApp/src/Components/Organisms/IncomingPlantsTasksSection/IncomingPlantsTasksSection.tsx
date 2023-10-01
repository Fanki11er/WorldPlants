import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { PlantWithTasks } from "../../../Interfaces/PlantWithTasks";
import { INCOMING_TASKS } from "../../../Constants/Constants";
import {
  SectionHeaderWithIcon,
  SectionHeaderWithIconIcon,
} from "../../Atoms/SectionHeaderWithIcon/SectionHeaderWithIcon";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { getErrorMessages } from "../../../Utils/Utils";
import incomingTasksIcon from "../../../assets/UpcomingTasks.svg";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import PlantsWithTasksList from "../../Molecules/PlantsWithTasksList/PlantsWithTasksList";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import useQueryKey from "../../../Hooks/useQueryKey";

const IncomingPlantsTasksSection = () => {
  const { getIncomingTasks } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { incomingTasksQueryKey } = useQueryKey();
  const { data, isLoading, error } = useQuery<PlantWithTasks[]>(
    incomingTasksQueryKey(),
    async () => {
      const result = await axiosPrivate.get(getIncomingTasks);
      return result.data;
    }
  );

  return (
    <SettingsSectionWrapper>
      <SectionHeaderWithIcon>
        <SectionHeaderWithIconIcon src={incomingTasksIcon} />
        Nadchodzące zadania
      </SectionHeaderWithIcon>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {isLoading && <LoadingIndicator />}
      {!isLoading && data?.length === 0 && (
        <NoListContentInfo
          informationHeaderText="Brak nadchodzących"
          informationText="Tu będą widoczne zadania do wykoniania w najbliższym tygodniu"
        />
      )}
      {data && data.length > 0 && (
        <PlantsWithTasksList plantsWithTasks={data} />
      )}
    </SettingsSectionWrapper>
  );
};

export default IncomingPlantsTasksSection;
