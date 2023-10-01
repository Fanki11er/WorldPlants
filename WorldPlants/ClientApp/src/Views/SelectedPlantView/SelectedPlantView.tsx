import { Outlet } from "react-router-dom";
// import { SettingsSectionWrapper } from "./SelectedPlantView.styles";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import PlantSideMenu from "../../Components/Molecules/PlantSideMenu/PlantSideMenu";
import SelectedPlantHeaderSection from "../../Components/Molecules/SelectedPlantHeaderSection/SelectedPlantHeaderSection";
import { SettingsSectionWrapper } from "../../Components/Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { ViewSectionsWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";

const SelectedPlantView = () => {
  return (
    <AuthorizedViewWrapper>
      <PlantSideMenu />
      <ViewSectionsWrapper>
        <SelectedPlantHeaderSection />
        <Outlet />
      </ViewSectionsWrapper>
    </AuthorizedViewWrapper>
  );
};

export default SelectedPlantView;
