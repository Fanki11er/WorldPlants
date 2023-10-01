import { TaskBasicInformation } from "./TaskBasicInformation";

export interface PlantWithTasks {
  plantId: string;
  userSiteId: string;
  plantName: string;
  userSiteName: string;
  plantPhoto: string;
  plantTasks: TaskBasicInformation[];
}
