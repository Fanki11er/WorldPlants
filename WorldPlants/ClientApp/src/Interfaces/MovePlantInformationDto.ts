import { DefaultSiteDto } from "./DefaultSiteDto";

export interface MovePlantInformationDto {
  plantId: string;
  currentSite: DefaultSiteDto;
  availableSites: DefaultSiteDto[];
}
