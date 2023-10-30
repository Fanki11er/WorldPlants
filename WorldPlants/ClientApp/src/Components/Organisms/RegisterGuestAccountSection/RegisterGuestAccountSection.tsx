import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";
import GuestRegistrationFormFormik from "../GuestRegistrationFormFormik/GuestRegistrationFormFormik";
import { RegisterGuestAccountSectionWrapper } from "./RegisterGuestAccountSection.styles";

const RegisterGuestAccountSection = () => {
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <RegisterGuestAccountSectionWrapper>
        <SettingsSectionHeader>Utwórz konto gościa</SettingsSectionHeader>
        <GuestRegistrationFormFormik />
      </RegisterGuestAccountSectionWrapper>
    </SettingsSectionWrapper>
  );
};

export default RegisterGuestAccountSection;
