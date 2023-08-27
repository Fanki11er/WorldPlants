import { Outlet } from "react-router-dom";
import { AuthorizedViewWrapper } from "../../Components/Atoms/AuthorizedViewWrapper/AuthorizedViewWrapper.styles";
import SearchPhraseProvider from "../../Providers/SearchPhraseProvider";

const AddPlantView = () => {
  return (
    <AuthorizedViewWrapper>
      <div>Menu</div>
      <SearchPhraseProvider>
        <Outlet />
      </SearchPhraseProvider>
    </AuthorizedViewWrapper>
  );
};

export default AddPlantView;
