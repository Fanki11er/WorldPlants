import { useNavigate } from "react-router-dom";
import { CustomActionTypeInformation } from "../../../Interfaces/CustomActionTypeInformation";
import { StyledButton } from "../PlantTasksList/PlantTasksList.styles";
import {
  CustomActionTypesListItemButtonsWrapper,
  CustomActionTypesListItem,
  CustomActionTypesListWrapper,
  CustomActionTypesListItemHeader,
} from "./CustomActionTypesList.styles";
import { paths } from "../../../Router/paths";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "react-query";
import useQueryKey from "../../../Hooks/useQueryKey";
import { apiEndpoints } from "../../../Api/endpoints";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { ActionButton, RedActionButton } from "../../Atoms/Buttons/Buttons";

interface Props {
  customActionTypes: CustomActionTypeInformation[];
}

const CustomActionTypesList = (props: Props) => {
  const { authorized, customActionsEdit, userSettings, customActions } = paths;
  const { customActionTypes } = props;
  const { deleteCustomActionType } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { customActionTypesQueryKey } = useQueryKey();
  const { mutate: deleteActionType, error } = useMutation({
    mutationFn: async (actionTypeId: number) => {
      return await axiosPrivate.delete(deleteCustomActionType(actionTypeId));
    },
    onSuccess: () => {
      client.invalidateQueries(customActionTypesQueryKey());
      navigate(`${authorized}/${userSettings}/${customActions}`);
    },
  });
  const navigate = useNavigate();

  const renderCustomActionTypes = (
    customActionTypes: CustomActionTypeInformation[]
  ) => {
    return customActionTypes.map((customActionType) => {
      return (
        <CustomActionTypesListWrapper key={customActionType.id}>
          <CustomActionTypesListItem>
            <CustomActionTypesListItemHeader>
              {customActionType.description}
            </CustomActionTypesListItemHeader>
            <CustomActionTypesListItemButtonsWrapper>
              <ActionButton
                onClick={() =>
                  navigate(
                    `${authorized}/${userSettings}/${customActionsEdit}/${customActionType.id}`
                  )
                }
              >
                Edytuj
              </ActionButton>
              <RedActionButton
                onClick={() => deleteActionType(customActionType.id)}
              >
                Usuń
              </RedActionButton>
            </CustomActionTypesListItemButtonsWrapper>
            {error ? (
              <FormRequestError errorValues={getErrorMessages(error)} />
            ) : null}
          </CustomActionTypesListItem>
        </CustomActionTypesListWrapper>
      );
    });
  };
  return (
    <CustomActionTypesListWrapper>
      {renderCustomActionTypes(customActionTypes)}
    </CustomActionTypesListWrapper>
  );
};

export default CustomActionTypesList;
