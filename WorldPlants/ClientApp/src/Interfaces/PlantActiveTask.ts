export interface PlantActiveTask {
  id: string | null;
  plantId: string;
  actionType: string;
  actionDate: string;
  partOfTheDay: string;
  description: string;
  interval?: number;
}

export enum StandardTaskTypeEnum {
  Water,
  Fertilize,
  Cut,
  Replant,
  Mist,
}
export type CustomTaskType = "custom";
