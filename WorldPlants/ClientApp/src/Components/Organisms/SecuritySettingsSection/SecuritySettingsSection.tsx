import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import ChangeSecuritySettingsForm from "../ChangeSecuritySettingsForm/ChangeSecuritySettingsForm";

const SecuritySettingsSection = () => {
  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Bezpieczeństwo</SettingsSectionHeader>

      <OptionsWrapper>
        <ChangeSecuritySettingsForm />
      </OptionsWrapper>
    </SettingsSectionWrapper>
  );
};

export default SecuritySettingsSection;
