import { GuestUserPermissionsDto } from "./GuestUserPermissionsDto";

export interface GuestUserWithPermissionsDto {
  id: string;
  name: string;
  guestUserPermissions: GuestUserPermissionsDto;
}
