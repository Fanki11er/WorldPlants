import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { getErrorMessages } from "../../../Utils/Utils";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import { MovePlantInformationDto } from "../../../Interfaces/MovePlantInformationDto";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import useQueryKey from "../../../Hooks/useQueryKey";
import MovePlantForm from "../../Molecules/MovePlantForm/MovePlantForm";

const MovePlantSection = () => {
  const { plantId } = useParams();
  const { getMovePlantInformation } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { movePlantInformationQueryKey } = useQueryKey();
  const { data, isLoading, error } = useQuery<MovePlantInformationDto>(
    movePlantInformationQueryKey(plantId),
    async () => {
      const result = await axiosPrivate.get(getMovePlantInformation(plantId));
      return result.data;
    },
    {
      enabled: !!plantId,
    }
  );
  return (
    <SettingsSectionWrapper>
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.availableSites.length > 0 && (
        <MovePlantForm movePlantInformation={data} />
      )}
      {data && data.availableSites.length === 0 && (
        <NoListContentInfo
          informationHeaderText="Nie ma możliwości przeniesienia"
          informationText="Nie posiadasz miejsc do których mógłbyś przenieść tę roślinę"
        />
      )}
    </SettingsSectionWrapper>
  );
};

export default MovePlantSection;
