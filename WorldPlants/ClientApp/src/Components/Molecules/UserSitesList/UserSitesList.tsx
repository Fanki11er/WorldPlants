import { UserSiteWithPlantsAndTasksDto } from "../../../Interfaces/UserSiteWithPlantsAndTasksDto";
import {
  LinkToSite,
  UserSiteListItemPlantImage,
  UserSiteListItemPlantTasksNumber,
  UserSiteListItemPlantWrapper,
  UserSiteListItemPlantsInformationWrapper,
  UserSitesListItemHeader,
  UserSitesListItemPlantsCountInfo,
  UserSitesListItemWrapper,
  UserSitesListWrapper,
} from "./UserSitesList.styles";
import { paths } from "../../../Router/paths";
import { PlantPictureNameNumberOfTasksDto } from "../../../Interfaces/PlantPictureNameNumberOfTasksDto";
import noPhoto from "../../../Assets/ImageFallback.svg";

interface Props {
  sites: UserSiteWithPlantsAndTasksDto[];
}

const UserSitesList = (props: Props) => {
  const { sites } = props;
  const { authorized, userSite } = paths;

  const numeralTranslationForNumbers = (
    number: number,
    singleValue: string,
    multiValues: string,
    defaultValue: string
  ) => {
    if (number === 1) {
      return singleValue;
    } else if (number >= 2 && number <= 4) {
      return multiValues;
    } else if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) {
      return multiValues;
    } else {
      return defaultValue;
    }
  };

  const renderPlantsInformation = (
    plantsInformation: PlantPictureNameNumberOfTasksDto[]
  ) => {
    return plantsInformation
      .sort((plantA, plantB) => {
        return plantB.numberOfTasks - plantA.numberOfTasks;
      })
      .map((plantInformation) => {
        return (
          <UserSiteListItemPlantWrapper key={plantInformation.id}>
            <UserSiteListItemPlantImage
              $imageUrl={
                plantInformation.imageUrl ? plantInformation.imageUrl : noPhoto
              }
            />
            <UserSiteListItemPlantTasksNumber>
              {plantInformation.numberOfTasks === 0
                ? "Brak zadań"
                : `${
                    plantInformation.numberOfTasks
                  } ${numeralTranslationForNumbers(
                    plantInformation.numberOfTasks,
                    "zadanie",
                    "zadania",
                    "zadań"
                  )}`}
            </UserSiteListItemPlantTasksNumber>
          </UserSiteListItemPlantWrapper>
        );
      });
  };

  const renderSites = (sites: UserSiteWithPlantsAndTasksDto[]) => {
    return sites.map((site) => {
      return (
        <UserSitesListItemWrapper key={site.siteId}>
          <LinkToSite to={`${authorized}/${userSite}/${site.siteId}`}>
            <UserSitesListItemHeader>{site.siteName}</UserSitesListItemHeader>
            <UserSitesListItemPlantsCountInfo>
              {`${site.plants.length} ${numeralTranslationForNumbers(
                site.plants.length,
                "Roślina",
                "Rośliny",
                "Roślin"
              )}`}
            </UserSitesListItemPlantsCountInfo>
            <UserSiteListItemPlantsInformationWrapper>
              {renderPlantsInformation(site.plants)}
            </UserSiteListItemPlantsInformationWrapper>
          </LinkToSite>
        </UserSitesListItemWrapper>
      );
    });
  };
  return <UserSitesListWrapper>{renderSites(sites)}</UserSitesListWrapper>;
};

export default UserSitesList;
