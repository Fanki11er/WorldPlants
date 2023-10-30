import { useParams } from "react-router-dom";
import { useState } from "react";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import NoListContentInfo from "../NoListContentInfo/NoListContentInfo";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { StandardTaskTypeFilter } from "../../../Interfaces/PlantActiveTask";
import { PlantTasksHistoryItem } from "../../../Interfaces/PlantTasksHistoryItem";
import { TASKS_HISTORY } from "../../../Constants/Constants";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import FilterForm from "../FilterForm/FilterForm";
import PlantTasksHistoryList from "../PlantTasksHistoryList/PlantTasksHistoryList";
import GoToTop from "../GoToTop/GoToTop";

const PlantTasksHistorySection = () => {
  const { getTasksHistory } = apiEndpoints;
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [filterValue, setFilterValue] = useState<StandardTaskTypeFilter>("");
  const { data, isLoading, error } = useQuery<PlantTasksHistoryItem[]>(
    [TASKS_HISTORY, plantId],
    async () => {
      const result = axiosPrivate.get(getTasksHistory(plantId));
      return (await result).data;
    },
    {
      enabled: !!plantId,
    }
  );

  const handleSetFilterValue = (value: StandardTaskTypeFilter) => {
    setFilterValue(value);
  };

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      {data && data.length > 0 && (
        <FilterForm
          setterFunction={handleSetFilterValue}
          initialFilterValue={filterValue}
        />
      )}
      {data && data.length > 0 && (
        <PlantTasksHistoryList tasksHistory={data} filter={filterValue} />
      )}
      {data && data.length == 0 && (
        <NoListContentInfo
          informationHeaderText="Brak wykonanych zadań"
          informationText="Tu będzie widoczna lista wykonanych zadań"
        />
      )}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {isLoading && <LoadingIndicator />}
    </SettingsSectionWrapper>
  );
};

export default PlantTasksHistorySection;
