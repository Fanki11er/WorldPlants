import { useParams } from "react-router-dom";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import NoListContentInfo from "../NoListContentInfo/NoListContentInfo";
import { UserSitePlantsSectionHeader } from "./UserSitePlantsSection.styles";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { SITE_PLANTS } from "../../../Constants/Constants";
import { apiEndpoints } from "../../../Api/endpoints";
import { PlantBasicInformationDto } from "../../../Interfaces/PlantBasicInformationDto";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import SitePlantsList from "../SitePlantsList/SitePlantsList";

const UserSitePlantsSection = () => {
  const { siteId } = useParams();
  const { getSitePlantsInformation } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { error, isLoading, data } = useQuery<PlantBasicInformationDto[]>(
    [SITE_PLANTS, siteId],
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
      <UserSitePlantsSectionHeader>Rośliny</UserSitePlantsSectionHeader>
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      {isLoading && <LoadingIndicator />}

      {data && data.length > 0 && (
        <SitePlantsList plantsBasicInformation={data} />
      )}
      {data && data.length == 0 && (
        <NoListContentInfo
          informationHeaderText={"To miejsce nie posiada jeszcze roslin"}
          informationText={"Dodaj rośliny..."}
        />
      )}
    </SettingsSectionWrapper>
  );
};

export default UserSitePlantsSection;
