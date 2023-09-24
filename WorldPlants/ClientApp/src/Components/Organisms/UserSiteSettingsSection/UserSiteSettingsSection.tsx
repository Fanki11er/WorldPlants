import { useQuery } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { apiEndpoints } from "../../../Api/endpoints";
import { useParams } from "react-router-dom";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper.styles";
import { GetUserSiteSettingsDto } from "../../../Interfaces/GetUserSiteSettingsDto";
import { SITE_SETTINGS } from "../../../Constants/Constants";
import ChangeSiteSettingsForm from "../ChangeSiteSettingsForm/ChangeSiteSettingsForm";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

const UserSiteSettingsSection = () => {
  const { siteId } = useParams();
  const { getUserSiteSettings } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, error, data } = useQuery<GetUserSiteSettingsDto>(
    SITE_SETTINGS,
    async () => {
      const result = await axiosPrivate.get(getUserSiteSettings(siteId!));
      return result.data;
    },
    {
      enabled: !!siteId,
      cacheTime: 0,
    }
  );

  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Ustawienia</SettingsSectionHeader>

      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && <ChangeSiteSettingsForm actualValues={data} />}
    </SettingsSectionWrapper>
  );
};

export default UserSiteSettingsSection;
