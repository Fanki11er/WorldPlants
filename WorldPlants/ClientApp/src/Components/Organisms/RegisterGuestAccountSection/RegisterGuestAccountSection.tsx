import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GuestRegistrationFormFormik from "../GuestRegistrationFormFormik/GuestRegistrationFormFormik";

const RegisterGuestAccountSection = () => {
  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Utwórz konto gościa</SettingsSectionHeader>
      <GuestRegistrationFormFormik />
    </SettingsSectionWrapper>
  );
};

export default RegisterGuestAccountSection;
