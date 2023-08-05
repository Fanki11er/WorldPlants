import { ButtonDeleteAccount } from "../../Components/Atoms/Buttons/Buttons";
import { DeleteAccountHeader } from "../../Components/Atoms/DeleteAccountHeader/DeleteAccountHeader";
import { DeletingAccountsWrapper } from "../../Components/Atoms/DeletingAccountsWrapper/DeletingAccountsWrapper";
import { HeaderAndOptionsWrapper } from "../../Components/Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import {
  HeaderPermissions,
  PermissionsWrapper,
} from "../../Components/Atoms/PermissionsWrapper/PermissionsWrapper";
import { SettingsHeader } from "../../Components/Atoms/SettingsHeader/SettingsHeader";
import {
  CheckboxNotification,
  HeaderNotification,
} from "../../Components/Molecules/NotificationForm/NotificationForm.styles";
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
            <PermissionsLabel>
              <HeaderNotification>Podlewanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Nawożenie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Nawilżanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Przycinanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Przesadzanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>
          </PermissionsFormWrapper>
        </PermissionsWrapper>

        <PermissionsWrapper>
          <HeaderPermissions>Miejsca</HeaderPermissions>

          <PermissionsFormWrapper>
            <PermissionsLabel>
              <HeaderNotification>Dodawanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Edycja</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Usuwanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>
          </PermissionsFormWrapper>
        </PermissionsWrapper>

        <PermissionsWrapper>
          <HeaderPermissions>Rośliny</HeaderPermissions>

          <PermissionsFormWrapper>
            <PermissionsLabel>
              <HeaderNotification>Dodawanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Edycja</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Usuwanie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>

            <PermissionsLabel>
              <HeaderNotification>Przenoszenie</HeaderNotification>
              <CheckboxNotification />
            </PermissionsLabel>
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
