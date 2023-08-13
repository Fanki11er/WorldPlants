export interface DefaultSiteDto {
  id: string;
  name: string;
  location: Location;
}

export type Location = "Indoor" | "Outdoor";
