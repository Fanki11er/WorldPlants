import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import PlantDetails from "../PlantDetails/PlantDetails";
import { useParams } from "react-router-dom";
import NoListContentInfo from "../NoListContentInfo/NoListContentInfo";
import useQueryKey from "../../../Hooks/useQueryKey";
import usePlantDetails from "../../../Hooks/usePlantDetails";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";

const PlantDetailsSection = () => {
  const { getPLantExternalId } = apiEndpoints;
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { plantExternalIdQueryKey } = useQueryKey();

  const {
    data: externalId,
    isLoading: isLoadingExternalId,
    error: isExternalIdError,
  } = useQuery<number | undefined>(
    plantExternalIdQueryKey(plantId),
    async () => {
      const result = await axiosPrivate.get(getPLantExternalId(plantId));
      return result.data;
    },
    {
      enabled: !!plantId,
    }
  );

  const { plantDetails, areDetailsLoading, detailsError } =
    usePlantDetails(externalId);
  return (
    <SettingsSectionWrapper>
      {(areDetailsLoading || isLoadingExternalId) && <LoadingIndicator />}
      {detailsError ? (
        <FormRequestError errorValues={getErrorMessages(detailsError)} />
      ) : null}
      {plantDetails && <PlantDetails plantDetails={plantDetails} />}
      {(!isLoadingExternalId && !externalId) || isExternalIdError ? (
        <NoListContentInfo
          informationHeaderText="Brak szczegółowych informacji"
          informationText="Ta roślina nie posiada szczegółowych informacji "
        />
      ) : null}
    </SettingsSectionWrapper>
  );
};

export default PlantDetailsSection;
