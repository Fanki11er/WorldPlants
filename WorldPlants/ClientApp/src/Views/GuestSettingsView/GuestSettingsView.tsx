import { HeaderAndOptionsWrapper } from "../../Components/Atoms/HeaderAntOptionsWrapper/HeaderAndOptionsWrapper";
import { OptionsWrapper } from "../../Components/Atoms/OptionsWrapper/OptionsWrapper";
import { SettingsHeader } from "../../Components/Atoms/SettingsHeader/SettingsHeader";
import NotificationList from "../../Components/Molecules/NotificationForm/NotificationForm";
import { GuestAccountsWrapper } from "../../Components/Organisms/GuestAccounts/GuestAccounts.styles";
import { GuestSettingsViewWrapper } from "./GuestSettingsView.styles";

const GuestSettingsView = () => {
  return (
    <GuestSettingsViewWrapper>
      <div>Nawigacja</div>
      <GuestAccountsWrapper>
        <HeaderAndOptionsWrapper>
          <SettingsHeader>Powiadomienia</SettingsHeader>
          <OptionsWrapper>
            <NotificationList />
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
      </GuestAccountsWrapper>
    </GuestSettingsViewWrapper>
  );
};

export default GuestSettingsView;
