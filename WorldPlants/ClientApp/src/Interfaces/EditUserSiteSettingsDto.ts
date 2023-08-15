import { GetUserSiteSettingsDto } from "./GetUserSiteSettingsDto";

export type EditUserSiteSettingsDto = Omit<
  GetUserSiteSettingsDto,
  "canChangeHasRoof" | "location"
>;
