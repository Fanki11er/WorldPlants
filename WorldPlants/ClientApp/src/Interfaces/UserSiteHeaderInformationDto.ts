import { Location } from "./DefaultSiteDto";
import { SunScale } from "./SunExposureDto";

export interface UserSiteHeaderInformationDto {
  id: number;
  name: string;
  location: Location;
  sunScale: SunScale;
}
