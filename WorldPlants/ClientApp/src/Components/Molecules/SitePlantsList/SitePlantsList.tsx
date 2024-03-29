import { PlantBasicInformationDto } from "../../../Interfaces/PlantBasicInformationDto";
import { paths } from "../../../Router/paths";
import { TaskBasicInformation } from "../../../Interfaces/TaskBasicInformation";

import {
  NoTasksIcon,
  SitePlantsListItem,
  SitePlantsListItemHeader,
  SitePlantsListItemImage,
  SitePlantsListItemLink,
  SitePlantsListItemNoTasksInformation,
  SitePlantsListItemTasksInformationWrapper,
  SitePlantsListWrapper,
} from "./SitePlantsList.styles";
import { useParams } from "react-router-dom";
import imageFallback from "../../../Assets/ImageFallback.svg";
import TaskInformation from "../TaskInformation/TaskInformation";
import noTasksIcon from "../../../assets/NoTasksIcon.svg";

interface Props {
  plantsBasicInformation: PlantBasicInformationDto[];
}

const SitePlantsList = (props: Props) => {
  const { plantsBasicInformation } = props;
  const { authorized, selectedPlant } = paths;
  const { siteId } = useParams();

  const renderTasksInformation = (tasksInformation: TaskBasicInformation[]) => {
    return tasksInformation.map((information) => {
      return (
        <TaskInformation taskInformation={information} key={information.id} />
      );
    });
  };

  const renderPlantsInformation = (
    plantsBasicInformation: PlantBasicInformationDto[]
  ) => {
    return plantsBasicInformation.map((information) => {
      return (
        <SitePlantsListItem key={information.id}>
          <SitePlantsListItemLink
            to={`${authorized}/${selectedPlant}/${information.id}`}
            state={{
              from: {
                siteId: siteId,
              },
            }}
          >
            <SitePlantsListItemImage
              $imageUrl={
                information.imageUrl ? information.imageUrl : imageFallback
              }
            />
            <SitePlantsListItemHeader>
              {information.name}
            </SitePlantsListItemHeader>
            <SitePlantsListItemTasksInformationWrapper>
              {information.tasksInformation.length > 0 &&
                renderTasksInformation(information.tasksInformation)}
              {information.tasksInformation.length == 0 && (
                <SitePlantsListItemNoTasksInformation>
                  <NoTasksIcon src={noTasksIcon} />
                  Brak zadań
                </SitePlantsListItemNoTasksInformation>
              )}
            </SitePlantsListItemTasksInformationWrapper>
          </SitePlantsListItemLink>
        </SitePlantsListItem>
      );
    });
  };
  return (
    <SitePlantsListWrapper>
      {plantsBasicInformation &&
        renderPlantsInformation(plantsBasicInformation)}
    </SitePlantsListWrapper>
  );
};

export default SitePlantsList;
