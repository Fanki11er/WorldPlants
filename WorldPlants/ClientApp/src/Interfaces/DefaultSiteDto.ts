export interface DefaultSiteDto {
  id: number;
  name: string;
  location: Location;
}

export type Location = "Indoor" | "Outdoor";
