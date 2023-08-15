import { UserSiteWithPlantsAndTasksDto } from "../../../Interfaces/UserSiteWithPlantsAndTasksDto";
import {
  LinkToSite,
  UserSitesListItemHeader,
  UserSitesListItemPlantsCountInfo,
  UserSitesListItemWrapper,
  UserSitesListWrapper,
  UserSitesPlantsImg,
} from "./UserSitesList.styles";
import sitesPlantsImg from "../../../Assets/SitePlants.svg";
import { paths } from "../../../Router/paths";

interface Props {
  sites: UserSiteWithPlantsAndTasksDto[];
}

const UserSitesList = (props: Props) => {
  const { sites } = props;
  const { authorized, userSite } = paths;
  const renderSites = (sites: UserSiteWithPlantsAndTasksDto[]) => {
    return sites.map((site) => {
      return (
        <UserSitesListItemWrapper key={site.siteId}>
          <LinkToSite to={`${authorized}/${userSite}/${site.siteId}`}>
            <UserSitesListItemHeader>{site.siteName}</UserSitesListItemHeader>
            <UserSitesListItemPlantsCountInfo>
              {`${site.plants.length} Roślin`}
            </UserSitesListItemPlantsCountInfo>
            <UserSitesPlantsImg src={sitesPlantsImg} alt="sitesPlantsImg" />
          </LinkToSite>
        </UserSitesListItemWrapper>
      );
    });
  };
  return <UserSitesListWrapper>{renderSites(sites)}</UserSitesListWrapper>;
};

export default UserSitesList;
