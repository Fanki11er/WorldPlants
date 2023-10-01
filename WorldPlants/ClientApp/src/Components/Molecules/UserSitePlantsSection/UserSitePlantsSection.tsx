import { useParams } from "react-router-dom";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import NoListContentInfo from "../NoListContentInfo/NoListContentInfo";
import { UserSitePlantsSectionHeader } from "./UserSitePlantsSection.styles";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import { PlantBasicInformationDto } from "../../../Interfaces/PlantBasicInformationDto";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import SitePlantsList from "../SitePlantsList/SitePlantsList";
import useQueryKey from "../../../Hooks/useQueryKey";

const UserSitePlantsSection = () => {
  const { siteId } = useParams();
  const { getSitePlantsInformation } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { sitePlantsQueryKey } = useQueryKey();
  const { error, isLoading, data } = useQuery<PlantBasicInformationDto[]>(
    sitePlantsQueryKey(siteId),
    async () => {
      const result = await axiosPrivate(getSitePlantsInformation(siteId));
      return result.data;
    },
    {
      enabled: !!siteId,
    }
  );

  return (
    <SettingsSectionWrapper>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      {isLoading && <LoadingIndicator />}

      {data && data.length > 0 && (
        <SitePlantsList plantsBasicInformation={data} />
      )}
      {data && data.length == 0 && (
        <NoListContentInfo
          informationHeaderText={"To miejsce nie posiada jeszcze roślin"}
          informationText={"Dodaj rośliny..."}
        />
      )}
    </SettingsSectionWrapper>
  );
};

export default UserSitePlantsSection;
