import { /*standardTaskType,*/ StandardTaskTypeEnum } from "./PlantActiveTask";

export interface TaskBasicInformation {
  id: string;
  actionType: StandardTaskTypeEnum & string;
  daysLeft: number;
}
