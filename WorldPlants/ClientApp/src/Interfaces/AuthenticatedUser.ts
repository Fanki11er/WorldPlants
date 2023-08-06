import { AccountType } from "./AccountType";

export interface AuthenticatedUser {
  name: string;
  accountType: AccountType;
  token: string;
}
