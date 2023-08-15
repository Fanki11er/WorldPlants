export interface GetUserSiteSettingsDto {
  name: string;
  warmPeriodMinTemperature: number;
  warmPeriodMaxTemperature: number;
  coldPeriodMinTemperature: number;
  coldPeriodMaxTemperature: number;
  hasRoof: boolean;
  canChangeHasRoof: boolean;
  location: number;
  sunExposureId: number;
}
