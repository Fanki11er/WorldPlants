import { useQuery } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { apiEndpoints } from "../../../Api/endpoints";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { UserSiteWithPlantsAndTasksDto } from "../../../Interfaces/UserSiteWithPlantsAndTasksDto";
import { USER_SITES } from "../../../Constants/Constants";
import UserSitesList from "../../Molecules/UserSitesList/UserSitesList";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const UserSitesSection = () => {
  const { getUserSites } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, error, data } = useQuery<UserSiteWithPlantsAndTasksDto[]>(
    USER_SITES,
    async () => {
      const result = await axiosPrivate.get(getUserSites);
      return result.data;
    }
  );

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.length ? (
        <UserSitesList sites={data} />
      ) : (
        <NoListContentInfo
          informationHeaderText={" Dodaj miejsca dla roślin"}
          informationText={
            "Tutaj będzie znajdować się lista miejsc, w których cieszyć sie będziesz swoimi roślinami"
          }
        />
      )}
    </SettingsSectionWrapper>
  );
};

export default UserSitesSection;
