export interface SunExposureDto {
  id: string;
  name: string;
  description: string[];
  sunScale: SunScale;
}

export type SunScale = "None" | "Low" | "Medium" | "High";
