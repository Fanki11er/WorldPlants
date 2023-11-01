import { apiEndpoints } from "../../../Api/endpoints";
import useGetCustomActionTypes from "../../../Hooks/useGetCustomActionTypes";
import usePermissions from "../../../Hooks/usePermissions";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import AddEditCustomActionForm from "../../Molecules/AddEditCustomActionForm/AddEditCustomActionForm";
import CustomActionTypesList from "../../Molecules/CustomActionTypesList/CustomActionTypesList";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import GoToTop from "../../Molecules/GoToTop/GoToTop";
import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";

const CustomActionTypesSection = () => {
  const { addCustomActionType } = apiEndpoints;
  const {
    customActionsTypes,
    customActionTypesAreLoading,
    customActionTypesError,
  } = useGetCustomActionTypes();
  const { permissions } = usePermissions();
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      {permissions?.canCreateCustomActionTypes && (
        <AddEditCustomActionForm
          currentTaskInformation={undefined}
          submitEndpoint={addCustomActionType}
        />
      )}
      {customActionTypesAreLoading && <LoadingIndicator />}
      {customActionTypesError ? (
        <FormRequestError
          errorValues={getErrorMessages(customActionTypesError)}
        />
      ) : null}
      {customActionsTypes && customActionsTypes.length == 0 && (
        <NoListContentInfo
          informationHeaderText="Brak własnych typów"
          informationText="Tu będą widoczne typy zadań zdefiniowane przez użytkowników"
        />
      )}
      {customActionsTypes && customActionsTypes.length > 0 && (
        <CustomActionTypesList customActionTypes={customActionsTypes} />
      )}
    </SettingsSectionWrapper>
  );
};

export default CustomActionTypesSection;
