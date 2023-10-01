import { SunScale } from "./SunExposureDto";

export interface PLantsDetailsDto {
  id: number;
  commonName: string | undefined;
  scientificName: string[];
  otherName: string[];
  defaultImage: string | undefined;
  watering: string | undefined;
  sunlight: SunScale[];
  plantType: string | undefined;
  averageHeight: number | undefined;
  lifeCycle: string | undefined;
  wateringPeriod: string | undefined;
  wateringGeneralBenchmark: PlantDetailsWateringGeneralBenchmark | undefined;
  pruningMonth: string[];
  pruningCount: PlantDetailsPruningCount;
  careLevel: string | undefined;
  growthRate: string | undefined;
  floweringSeason: string | undefined;
  harvestSeason: string | undefined;
  poisonousToHumans: string | undefined;
  poisonousToPets: string | undefined;
  fruits: boolean | undefined;
  edibleFruits: boolean | undefined;
  droughtTolerant: boolean | undefined;
  invasive: boolean | undefined;
  indoor: boolean | undefined;
  description: string | undefined;
}

export type LevelScale = "Low" | "Medium" | "High";
export type Watering = LevelScale;
export type Sunlight = LevelScale | "None";

type PlantDetailsWateringGeneralBenchmark = {
  value: string | undefined;
  unit: string | undefined;
};

type PlantDetailsPruningCount = {
  amount: number | undefined;
  interval: string | undefined;
};
