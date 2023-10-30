import todayTasksIcon from "../../../assets/TaskForToday.svg";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { TODAY_TASKS } from "../../../Constants/Constants";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import {
  SectionHeaderWithIcon,
  SectionHeaderWithIconIcon,
} from "../../Atoms/SectionHeaderWithIcon/SectionHeaderWithIcon";
import { PlantWithTasks } from "../../../Interfaces/PlantWithTasks";
import PlantsWithTasksList from "../../Molecules/PlantsWithTasksList/PlantsWithTasksList";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import useQueryKey from "../../../Hooks/useQueryKey";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const TodayPlantsTasksSection = () => {
  const { getTodayTasks } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { todayTasksQueryKey } = useQueryKey();
  const { data, isLoading, error } = useQuery<PlantWithTasks[]>(
    todayTasksQueryKey(),
    async () => {
      const result = await axiosPrivate.get(getTodayTasks);
      return result.data;
    }
  );

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <SectionHeaderWithIcon>
        <SectionHeaderWithIconIcon src={todayTasksIcon} />
        Dzisiejsze zadania
      </SectionHeaderWithIcon>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {isLoading && <LoadingIndicator />}
      {!isLoading && data?.length === 0 && (
        <NoListContentInfo
          informationHeaderText="Brak zadań na dzisiaj"
          informationText="Tu będą widoczne zadania, które należy wykonać danego dnia"
        />
      )}
      {data && data.length > 0 && (
        <PlantsWithTasksList plantsWithTasks={data} />
      )}
    </SettingsSectionWrapper>
  );
};

export default TodayPlantsTasksSection;
