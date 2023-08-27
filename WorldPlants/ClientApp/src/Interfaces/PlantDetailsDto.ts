import { SunScale } from "./SunExposureDto";

export interface PLantsDetailsDto {
  id: number;
  commonName: string | null;
  scientificName: string[];
  otherName: string[];
  defaultImage: string | null;
  watering: string | null;
  sunlight: SunScale[];
  plantType: string | null;
  averageHeight: number | null;
  lifeCycle: string | null;
  wateringPeriod: string | null;
  wateringGeneralBenchmark: PlantDetailsWateringGeneralBenchmark | null;
  pruningMonth: string[];
  pruningCount: PlantDetailsPruningCount;
  careLevel: string | null;
  growthRate: string | null;
  floweringSeason: string | null;
  harvestSeason: string | null;
  poisonousToHumans: string | null;
  poisonousToPets: string | null;
  fruits: boolean | null;
  edibleFruits: boolean | null;
  droughtTolerant: boolean | null;
  invasive: boolean | null;
  indoor: boolean | null;
  description: string | null;
}

export type LevelScale = "Low" | "Medium" | "High";
export type Watering = LevelScale;
export type Sunlight = LevelScale | "None";

type PlantDetailsWateringGeneralBenchmark = {
  value: string | null;
  unit: string | null;
};

type PlantDetailsPruningCount = {
  amount: number | null;
  interval: string | null;
};
