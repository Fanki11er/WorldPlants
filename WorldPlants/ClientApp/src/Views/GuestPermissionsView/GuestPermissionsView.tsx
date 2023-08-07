import { ButtonDeleteAccount } from "../../Components/Atoms/Buttons/Buttons";
import { DeleteAccountHeader } from "../../Components/Atoms/DeleteAccountHeader/DeleteAccountHeader";
import { DeletingAccountsWrapper } from "../../Components/Atoms/DeletingAccountsWrapper/DeletingAccountsWrapper";
import { HeaderAndOptionsWrapper } from "../../Components/Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import {
  HeaderPermissions,
  PermissionsWrapper,
} from "../../Components/Atoms/PermissionsWrapper/PermissionsWrapper";
import { SettingsHeader } from "../../Components/Atoms/SettingsHeader/SettingsHeader";
import CheckboxInput from "../../Components/Molecules/CheckboxInput/CheckboxInput";
import {
  CheckboxNotification,
  HeaderNotification,
} from "../../Components/Molecules/CheckboxInput/CheckboxInput.styles";
import {
  PermissionsFormWrapper,
  PermissionsLabel,
} from "../../Components/Molecules/PermissionsForm/PermissionsForm.styles";
import { HeaderWrapper } from "../LandingView/LandingView.styles";
import { GuestPermissionsViewWrapper } from "./GuestPermissionsView.styles";

const GuestPermissionsView = () => {
  return (
    <GuestPermissionsViewWrapper>
      <div>Nawigacja</div>
      <HeaderAndOptionsWrapper>
        <HeaderPermissions>Konto gościa: Ewelina</HeaderPermissions>
        <SettingsHeader>Uprawnienia</SettingsHeader>

        <PermissionsWrapper>
          <HeaderPermissions>Zadania</HeaderPermissions>

          <PermissionsFormWrapper>
            <CheckboxInput id={"waterPlantsReminder"} label="Podlewanie" />
          </PermissionsFormWrapper>
        </PermissionsWrapper>

        <PermissionsWrapper>
          <HeaderPermissions>Miejsca</HeaderPermissions>

          <PermissionsFormWrapper>
            <CheckboxInput id={"waterPlantsReminder"} label="Podlewanie" />
          </PermissionsFormWrapper>
        </PermissionsWrapper>

        <DeleteAccountHeader>Usuwanie konta</DeleteAccountHeader>
        <DeletingAccountsWrapper>
          <ButtonDeleteAccount>Usuń konto</ButtonDeleteAccount>
        </DeletingAccountsWrapper>
      </HeaderAndOptionsWrapper>
    </GuestPermissionsViewWrapper>
  );
};

export default GuestPermissionsView;
