import { Outlet } from "react-router-dom";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import SearchPhraseProvider from "../../Providers/SearchPhraseProvider";
import AddPlantSideMenu from "../../Components/Molecules/AddPlantSideMenu/AddPlantSideMenu";
import { ViewSectionsWrapper } from "../../Components/Atoms/ViewWrapper/ViewWrapper";
import UserSiteHeader from "../../Components/Molecules/UserSiteHeader/UserSiteHeader";

const AddPlantView = () => {
  return (
    <AuthorizedViewWrapper>
      <AddPlantSideMenu />
      <ViewSectionsWrapper>
        <UserSiteHeader />
        <SearchPhraseProvider>
          <Outlet />
        </SearchPhraseProvider>
      </ViewSectionsWrapper>
    </AuthorizedViewWrapper>
  );
};

export default AddPlantView;
