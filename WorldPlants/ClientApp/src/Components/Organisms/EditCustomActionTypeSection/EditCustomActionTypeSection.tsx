import { useParams } from "react-router-dom";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import AddEditCustomActionForm from "../../Molecules/AddEditCustomActionForm/AddEditCustomActionForm";
import { useQueryClient } from "react-query";
import useQueryKey from "../../../Hooks/useQueryKey";
import { CustomActionTypeInformation } from "../../../Interfaces/CustomActionTypeInformation";
import { useEffect, useState } from "react";
import { apiEndpoints } from "../../../Api/endpoints";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const EditCustomActionTypeSection = () => {
  const { editCustomActionType } = apiEndpoints;
  const { customActionId } = useParams();
  const client = useQueryClient();
  const { customActionTypesQueryKey } = useQueryKey();
  const data = client.getQueryData<CustomActionTypeInformation[]>(
    customActionTypesQueryKey()
  );
  const [selectedActionType, setSelectedActionType] = useState<
    CustomActionTypeInformation | undefined
  >(undefined);

  useEffect(() => {
    if (data && data.length) {
      const result = data.find((actionType) => {
        return actionType.id.toString() === customActionId;
      });
      setSelectedActionType(result);
    }
  }, [data, customActionId]);

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <SettingsSectionHeader>Edycja typu akcji</SettingsSectionHeader>
      {selectedActionType && (
        <AddEditCustomActionForm
          currentTaskInformation={selectedActionType}
          submitEndpoint={editCustomActionType(Number(customActionId))}
        />
      )}
    </SettingsSectionWrapper>
  );
};

export default EditCustomActionTypeSection;
