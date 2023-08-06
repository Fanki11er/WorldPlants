import { ButtonDeleteAccount } from "../../Atoms/Buttons/Buttons";
import { DeleteAccountHeader } from "../../Atoms/DeleteAccountHeader/DeleteAccountHeader";
import { DeletingAccountsWrapper } from "../../Atoms/DeletingAccountsWrapper/DeletingAccountsWrapper";
import { HeaderAndOptionsWrapper } from "../../Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper";
import { SettingsHeader } from "../../Atoms/SettingsHeader/SettingsHeader";
import GuestListItem from "../../Molecules/GuestListItem/GuestListItem";
import NotificationForm from "../../Molecules/NotificationForm/NotificationForm";
import { GuestAccountsWrapper } from "./GuestAccounts.styles";

const GuestAccounts = () => {
  return (
    <GuestAccountsWrapper>
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
