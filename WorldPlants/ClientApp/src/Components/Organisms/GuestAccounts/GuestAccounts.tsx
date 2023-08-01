import {
  ButtonDeleteAccount,
  NavigationLink,
} from "../../Atoms/Buttons/Buttons";
import { DeleteAccountHeader } from "../../Atoms/DeleteAccountHeader/DeleteAccountHeader";
import { DeletingAccountsWrapper } from "../../Atoms/DeletingAccountsWrapper/DeletingAccountsWrapper";
import { FormInputsWrapper } from "../../Atoms/FormInputsWrapper/FormInputsWrapper";
import { HeaderAndOptionsWrapper } from "../../Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper";
import { SettingsHeader } from "../../Atoms/SettingsHeader/SettingsHeader";
import { GuestAccountListWrapper } from "../../Molecules/GuestAccountList/GuestAccountList.styles";
import GuestListItem from "../../Molecules/GuestListItem/GuestListItem";
import {
  HeaderGuestListItem,
  GuestListItemWrapper,
} from "../../Molecules/GuestListItem/GuestListItem.styles";
import InputField from "../../Molecules/InputField/InputField";
import NotificationListItem from "../../Molecules/NotificationListItem/NotificationListItem";
import { NotificationListItemWrapper } from "../../Molecules/NotificationListItem/NotificationListItem.styles";
import { GuestAccountsWrapper } from "./GuestAccounts.styles";

const GuestAccounts = () => {
  return (
    <GuestAccountsWrapper>
      <HeaderAndOptionsWrapper>
        <SettingsHeader>Konta gości</SettingsHeader>
        <OptionsWrapper>
          <GuestAccountListWrapper>
            <GuestListItemWrapper>
              <GuestListItem />
            </GuestListItemWrapper>
          </GuestAccountListWrapper>
        </OptionsWrapper>
      </HeaderAndOptionsWrapper>

      <HeaderAndOptionsWrapper>
        <SettingsHeader>Powiadomienia</SettingsHeader>
        <OptionsWrapper>
          <NotificationListItemWrapper>
            <GuestListItemWrapper>
              <NotificationListItem />
            </GuestListItemWrapper>
            <GuestListItemWrapper></GuestListItemWrapper>
            <GuestListItemWrapper></GuestListItemWrapper>
            <GuestListItemWrapper></GuestListItemWrapper>
            <GuestListItemWrapper></GuestListItemWrapper>
          </NotificationListItemWrapper>
        </OptionsWrapper>
      </HeaderAndOptionsWrapper>

      <HeaderAndOptionsWrapper>
        <SettingsHeader>Konto</SettingsHeader>
        <OptionsWrapper></OptionsWrapper>
      </HeaderAndOptionsWrapper>

      <HeaderAndOptionsWrapper>
        <SettingsHeader>Bezpieczeństwo</SettingsHeader>
        <OptionsWrapper></OptionsWrapper>
      </HeaderAndOptionsWrapper>

      <HeaderAndOptionsWrapper>
        <DeleteAccountHeader>Usuwanie konta</DeleteAccountHeader>
        <DeletingAccountsWrapper>
          <ButtonDeleteAccount>Usuń konto</ButtonDeleteAccount>
        </DeletingAccountsWrapper>
      </HeaderAndOptionsWrapper>
    </GuestAccountsWrapper>
  );
};

export default GuestAccounts;
