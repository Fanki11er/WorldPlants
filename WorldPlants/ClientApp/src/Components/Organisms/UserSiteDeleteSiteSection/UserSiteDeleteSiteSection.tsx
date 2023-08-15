import { useParams } from "react-router-dom";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { GetSiteBeforeDeleteInformationDto } from "../../../Interfaces/GetSiteBeforeDeleteInformationDto";
import { useQuery } from "react-query";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { SITE_BEFORE_DELETE_INFO } from "../../../Constants/Constants";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import DeleteSiteForm from "../DeleteSiteForm/DeleteSiteForm";

const UserSiteDeleteSiteSection = () => {
  const { siteId } = useParams();
  const { getBeforeDeleteSiteInformation } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, error, data } =
    useQuery<GetSiteBeforeDeleteInformationDto>(
      SITE_BEFORE_DELETE_INFO,
      async () => {
        const result = await axiosPrivate.get(
          getBeforeDeleteSiteInformation(siteId!)
        );
        return result.data;
      },
      {
        enabled: !!siteId,
        cacheTime: 0,
      }
    );

  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>
        {`Usuń miejsce: ${data?.name}`}
      </SettingsSectionHeader>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && (
        <DeleteSiteForm plantsCount={data.plantsCount} siteName={data.name} />
      )}
    </SettingsSectionWrapper>
  );
};

export default UserSiteDeleteSiteSection;
