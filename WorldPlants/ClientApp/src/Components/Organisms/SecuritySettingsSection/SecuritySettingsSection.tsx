import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper.styles";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";
import ChangeSecuritySettingsForm from "../ChangeSecuritySettingsForm/ChangeSecuritySettingsForm";

const SecuritySettingsSection = () => {
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <SettingsSectionHeader>Zmień hasło</SettingsSectionHeader>
      <OptionsWrapper>
        <ChangeSecuritySettingsForm />
      </OptionsWrapper>
    </SettingsSectionWrapper>
  );
};

export default SecuritySettingsSection;
