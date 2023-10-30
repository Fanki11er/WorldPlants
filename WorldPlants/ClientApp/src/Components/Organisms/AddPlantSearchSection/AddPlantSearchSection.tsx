import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useSearchPhrase from "../../../Hooks/useSearchPhrase";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import { SearchPlantResultsDto } from "../../../Interfaces/SearchPlantResultsDto";
import { SEARCH_PLANT_RESULTS } from "../../../Constants/Constants";
import AddPlantSearchForm from "../../Molecules/AddPlantSearchForm/AddPlantSearchForm";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import AddPlantSearchOrRecognizeResults from "../../Molecules/AddPlantSearchOrRecognizeResults/AddPlantSearchOrRecognizeResults";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const AddPlantSearchSection = () => {
  const { searchForPlant } = apiEndpoints;
  const { searchPhrase } = useSearchPhrase();
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useQuery<SearchPlantResultsDto[]>(
    [SEARCH_PLANT_RESULTS, searchPhrase],
    async () => {
      const result = await axiosPrivate.get(searchForPlant(searchPhrase));
      return result.data;
    },
    {
      enabled: !!searchPhrase,
    }
  );

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <AddPlantSearchForm isLoading={isLoading} />
      {isLoading && <LoadingIndicator />}
      {data ? (
        data.length ? (
          <AddPlantSearchOrRecognizeResults results={data} />
        ) : (
          <NoListContentInfo
            informationHeaderText={"Brak wyników wyszukiwania"}
            informationText={`Nie znaleziono wyników dla wyrażenia ${searchPhrase}`}
          />
        )
      ) : null}
    </SettingsSectionWrapper>
  );
};

export default AddPlantSearchSection;
