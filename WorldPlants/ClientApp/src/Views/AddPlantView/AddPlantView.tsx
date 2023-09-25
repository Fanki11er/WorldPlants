import { Outlet } from "react-router-dom";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import SearchPhraseProvider from "../../Providers/SearchPhraseProvider";
import AddPlantSideMenu from "../../Components/Molecules/AddPlantSideMenu/AddPlantSideMenu";

const AddPlantView = () => {
  return (
    <AuthorizedViewWrapper>
      <AddPlantSideMenu />
      <SearchPhraseProvider>
        <Outlet />
      </SearchPhraseProvider>
    </AuthorizedViewWrapper>
  );
};

export default AddPlantView;
