import { PlantPictureNameNumberOfTasksDto } from "./PlantPictureNameNumberOfTasksDto";

export interface UserSiteWithPlantsAndTasksDto {
  siteId: number;
  siteName: string;
  plants: PlantPictureNameNumberOfTasksDto[];
}
