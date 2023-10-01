import { useParams } from "react-router-dom";
import {
  UserSiteHeaderIcon,
  UserSiteHeaderIconsWrapper,
  UserSiteHeaderWrapper,
} from "./UserSiteHeader.styles";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import {
  getErrorMessages,
  getLocationIcon,
  selectSunScaleIcon,
} from "../../../Utils/Utils";
import FormRequestError from "../FormRequestError/FormRequestError";
import useQueryKey from "../../../Hooks/useQueryKey";
import { UserSiteHeaderInformationDto } from "../../../Interfaces/UserSiteHeaderInformationDto";

const UserSiteHeader = () => {
  const { siteId } = useParams();
  const { getSiteHeaderInformation } = apiEndpoints;
  const { userSiteHeaderQueryKey } = useQueryKey();
  const axiosPrivate = useAxiosPrivate();
  const { data, isLoading, error } = useQuery<UserSiteHeaderInformationDto>(
    userSiteHeaderQueryKey(siteId),
    async () => {
      const result = await axiosPrivate.get(getSiteHeaderInformation(siteId));
      return result.data;
    }
  );
  return (
    <UserSiteHeaderWrapper>
      {data && (
        <>
          {data.name}
          <UserSiteHeaderIconsWrapper>
            <UserSiteHeaderIcon src={getLocationIcon(data.location)} />
            <UserSiteHeaderIcon src={selectSunScaleIcon(data.sunScale)} />
          </UserSiteHeaderIconsWrapper>
        </>
      )}
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
    </UserSiteHeaderWrapper>
  );
};

export default UserSiteHeader;
