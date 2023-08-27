import { LevelScale } from "./PlantDetailsDto";

export interface SearchPlantResultsDto {
  id: number;
  commonName: string;
  scientificName: string[];
  watering: LevelScale;
  sunlight: LevelScale[];
  defaultImage: string;
}
