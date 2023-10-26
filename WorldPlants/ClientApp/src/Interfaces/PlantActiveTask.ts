export interface PlantActiveTask {
  id: string | null;
  plantId: string;
  actionTypeId: number;
  actionName: string;
  actionDate: string;
  partOfTheDay: string;
  description: string;
  interval?: number;
}

export enum StandardTaskTypeEnum {
  Water = 1,
  Fertilize = 2,
  Cut = 3,
  Replant = 4,
  Mist = 5,
}
export type CustomTaskType = "Custom";

export type StandardTaskType =
  | "Water"
  | "Fertilize"
  | "Cut"
  | "Replant"
  | "Mist"
  | "Custom";

export type StandardTaskTypeFilter = StandardTaskType | "";
