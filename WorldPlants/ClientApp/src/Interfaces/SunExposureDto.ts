export interface SunExposureDto {
  id: number;
  name: string;
  description: string[];
  sunScale: SunScale;
}

export type SunScale = "None" | "Low" | "Medium" | "High";
