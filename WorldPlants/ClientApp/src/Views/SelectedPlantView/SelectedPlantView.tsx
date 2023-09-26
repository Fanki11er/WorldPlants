import { Outlet } from "react-router-dom";
// import { SettingsSectionWrapper } from "./SelectedPlantView.styles";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import PlantSideMenu from "../../Components/Molecules/PlantSideMenu/PlantSideMenu";
import SelectedPlantHeaderSection from "../../Components/Molecules/SelectedPlantHeaderSection/SelectedPlantHeaderSection";
import { SettingsSectionWrapper } from "../../Components/Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";

const SelectedPlantView = () => {
  return (
    <AuthorizedViewWrapper>
      <PlantSideMenu />
      <SettingsSectionWrapper>
        <SelectedPlantHeaderSection />
        <Outlet />
      </SettingsSectionWrapper>
    </AuthorizedViewWrapper>
  );
};

export default SelectedPlantView;
