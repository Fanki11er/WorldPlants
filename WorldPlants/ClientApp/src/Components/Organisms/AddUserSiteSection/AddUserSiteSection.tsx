import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import GoToTop from "../../Molecules/GoToTop/GoToTop";
import AddUserSiteMultiStepForm from "../AddUserSiteMultiStepForm/AddUserSiteMultiStepForm";

const AddUserSiteSection = () => {
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <AddUserSiteMultiStepForm />
    </SettingsSectionWrapper>
  );
};

export default AddUserSiteSection;
