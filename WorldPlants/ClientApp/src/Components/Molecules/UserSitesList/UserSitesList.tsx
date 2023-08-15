import { UserSiteWithPlantsAndTasksDto } from "../../../Interfaces/UserSiteWithPlantsAndTasksDto";
import {
  UserSitesListItemHeader,
  UserSitesListItemPlantsCountInfo,
  UserSitesListItemWrapper,
  UserSitesListWrapper,
  UserSitesPlantsImg,
} from "./UserSitesList.styles";
import sitesPlantsImg from "../../../Assets/SitePlants.svg";

interface Props {
  sites: UserSiteWithPlantsAndTasksDto[];
}

const UserSitesList = (props: Props) => {
  const { sites } = props;
  const renderSites = (sites: UserSiteWithPlantsAndTasksDto[]) => {
    return sites.map((site) => {
      return (
        <UserSitesListItemWrapper key={site.siteId}>
          <UserSitesListItemHeader>{site.siteName}</UserSitesListItemHeader>
          <UserSitesListItemPlantsCountInfo>
            {`${site.plants.length} Roślin`}
          </UserSitesListItemPlantsCountInfo>
          <UserSitesPlantsImg src={sitesPlantsImg} alt="sitesPlantsImg" />
        </UserSitesListItemWrapper>
      );
    });
  };
  return <UserSitesListWrapper>{renderSites(sites)}</UserSitesListWrapper>;
};

export default UserSitesList;
