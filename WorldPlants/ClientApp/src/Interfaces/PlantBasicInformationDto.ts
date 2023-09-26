import { TaskBasicInformation } from "./TaskBasicInformation";

export interface PlantBasicInformationDto {
  id: string;
  name: string;
  imageUrl?: string;
  tasksInformation: TaskBasicInformation[];
}
