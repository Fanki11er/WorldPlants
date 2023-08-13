import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GuestRegistrationFormFormik from "../GuestRegistrationFormFormik/GuestRegistrationFormFormik";
import { RegisterGuestAccountSectionWrapper } from "./RegisterGuestAccountSection.styles";

const RegisterGuestAccountSection = () => {
  return (
    <SettingsSectionWrapper>
      <RegisterGuestAccountSectionWrapper>
        <SettingsSectionHeader>Utwórz konto gościa</SettingsSectionHeader>
        <GuestRegistrationFormFormik />
      </RegisterGuestAccountSectionWrapper>
    </SettingsSectionWrapper>
  );
};

export default RegisterGuestAccountSection;
