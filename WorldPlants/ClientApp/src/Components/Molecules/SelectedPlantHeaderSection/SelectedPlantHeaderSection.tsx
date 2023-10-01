import { useParams } from "react-router-dom";
import {
  SelectedPlantHeaderSectionAdditionalDescription,
  SelectedPlantHeaderSectionImage,
  SelectedPlantHeaderSectionPlantName,
  SelectedPlantHeaderSectionToUserSiteLink,
  SelectedPlantHeaderSectionTopWrapper,
  SelectedPlantHeaderSectionWrapper,
} from "./SelectedPlantHeaderSection.styles";
import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { paths } from "../../../Router/paths";
import imageFallback from "../../../Assets/ImageFallback.svg";
import { PlantHeaderInformation } from "../../../Interfaces/PlantHeaderInformation";
import useQueryKey from "../../../Hooks/useQueryKey";

const SelectedPlantHeaderSection = () => {
  const { plantId } = useParams();
  const { userSite, authorized } = paths;
  const axiosPrivate = useAxiosPrivate();
  const { plantHeaderInformationQueryKey } = useQueryKey();
  const { getPlantHeaderInformation } = apiEndpoints;
  const {
    isLoading: isPlantHeaderInfoLoading,
    data: plantHeaderInfoData,
    error: plantHeaderInfoError,
  } = useQuery<PlantHeaderInformation>(
    plantHeaderInformationQueryKey(plantId),
    async () => {
      const result = await axiosPrivate.get(getPlantHeaderInformation(plantId));
      return result.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <SelectedPlantHeaderSectionWrapper>
      <SelectedPlantHeaderSectionImage
        $imageUrl={
          plantHeaderInfoData?.imageUrl
            ? plantHeaderInfoData.imageUrl
            : imageFallback
        }
      />

      {isPlantHeaderInfoLoading && <LoadingIndicator />}
      {plantHeaderInfoError ? (
        <FormRequestError
          errorValues={getErrorMessages(plantHeaderInfoError)}
        />
      ) : null}
      {plantHeaderInfoData && (
        <SelectedPlantHeaderSectionTopWrapper>
          <SelectedPlantHeaderSectionPlantName>
            {plantHeaderInfoData.name}
            <SelectedPlantHeaderSectionToUserSiteLink
              to={`${authorized}/${userSite}/${plantHeaderInfoData.userSiteId}`}
            >
              {` (${plantHeaderInfoData.userSiteName})`}
            </SelectedPlantHeaderSectionToUserSiteLink>
          </SelectedPlantHeaderSectionPlantName>
          {plantHeaderInfoData.additionalDescription && (
            <SelectedPlantHeaderSectionAdditionalDescription>
              {plantHeaderInfoData.additionalDescription}
            </SelectedPlantHeaderSectionAdditionalDescription>
          )}
        </SelectedPlantHeaderSectionTopWrapper>
      )}
    </SelectedPlantHeaderSectionWrapper>
  );
};

export default SelectedPlantHeaderSection;
