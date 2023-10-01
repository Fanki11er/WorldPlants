import {
  PlantsWithTasksListItem,
  PlantsWithTasksListItemHeader,
  PlantsWithTasksListItemHeaderWrapper,
  PlantsWithTasksListItemPlantPhoto,
  PlantsWithTasksListWrapper,
} from "./PlantsWithTasksList.styles";
import noPhoto from "../../../Assets/ImageFallback.svg";
import { PlantWithTasks } from "../../../Interfaces/PlantWithTasks";
import { paths } from "../../../Router/paths";
import PlantTasksList from "../PlantTasksList/PlantTasksList";

interface Props {
  plantsWithTasks: PlantWithTasks[];
}

const PlantsWithTasksList = (props: Props) => {
  const { plantsWithTasks } = props;
  const { authorized, selectedPlant, userSite } = paths;
  const renderPlantsWithTasks = (plantsWithTasks: PlantWithTasks[]) => {
    return plantsWithTasks.map((plant) => {
      return (
        <PlantsWithTasksListItem key={plant.plantId}>
          <PlantsWithTasksListItemHeaderWrapper>
            <PlantsWithTasksListItemPlantPhoto
              $imageUrl={plant.plantPhoto ? plant.plantPhoto : noPhoto}
            />
            <PlantsWithTasksListItemHeader
              to={`${authorized}/${selectedPlant}/${plant.plantId}`}
            >
              {plant.plantName}
            </PlantsWithTasksListItemHeader>
            <PlantsWithTasksListItemHeader
              to={`${authorized}/${userSite}/${plant.userSiteId}`}
            >
              {`(${plant.userSiteName})`}
            </PlantsWithTasksListItemHeader>
          </PlantsWithTasksListItemHeaderWrapper>
          <PlantTasksList tasks={plant.plantTasks} plantId={plant.plantId} />
        </PlantsWithTasksListItem>
      );
    });
  };

  return (
    <PlantsWithTasksListWrapper>
      {renderPlantsWithTasks(plantsWithTasks)}
    </PlantsWithTasksListWrapper>
  );
};

export default PlantsWithTasksList;
