import { Formik } from "formik";
import {
  GuestUserPermissionsFormWrapper,
  PermissionsGroup,
  PermissionsGroupHeder,
} from "./GuestUserPermissionsForm.styles";
import CheckboxInput from "../../Molecules/CheckboxInput/CheckboxInput";
import { GuestUserPermissionsDto } from "../../../Interfaces/GuestUserPermissionsDto";
import { GuestUserWithPermissionsDto } from "../../../Interfaces/GuestUserWithPermissionsDto";
import { GUEST_USER_PERMISSIONS } from "../../../Constants/Constants";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

interface Props {
  actualValues: GuestUserWithPermissionsDto;
}

const GuestUserPermissionsForm = (props: Props) => {
  const { changeGuestPermissions } = apiEndpoints;
  const { id, guestUserPermissions } = props.actualValues;
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();

  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: (dto: GuestUserPermissionsDto) => {
      return axiosPrivate.post(changeGuestPermissions(id), dto);
    },
  });

  return (
    <Formik
      initialValues={{
        canMovePlants: guestUserPermissions.canMovePlants,
        canAddPlants: guestUserPermissions.canAddPlants,
        canRemovePlants: guestUserPermissions.canRemovePlants,
        canEditPlants: guestUserPermissions.canEditPlants,
        canAddSites: guestUserPermissions.canAddSites,
        canRemoveSites: guestUserPermissions.canRemoveSites,
        canEditSites: guestUserPermissions.canEditSites,
        canCreateCustomActionTypes:
          guestUserPermissions.canCreateCustomActionTypes,
        canEditCustomActionTypes: guestUserPermissions.canEditCustomActionTypes,
        canDeleteCustomActionTypes:
          guestUserPermissions.canDeleteCustomActionTypes,
      }}
      onSubmit={(values: GuestUserPermissionsDto, { setSubmitting }) => {
        mutate(values, {
          onSuccess: () => {
            client.invalidateQueries(GUEST_USER_PERMISSIONS);
          },
        });
        setSubmitting(false);
      }}
    >
      <GuestUserPermissionsFormWrapper>
        <PermissionsGroup>
          <PermissionsGroupHeder>Miejsca</PermissionsGroupHeder>
          <CheckboxInput id={"canAddSites"} label={"Dodawanie"} />
          <CheckboxInput id={"canEditSites"} label={"Edycja"} />
          <CheckboxInput id={"canRemoveSites"} label={"Usuwanie"} />
        </PermissionsGroup>

        <PermissionsGroup>
          <PermissionsGroupHeder>Rośliny</PermissionsGroupHeder>
          <CheckboxInput id={"canAddPlants"} label={"Dodawanie"} />
          <CheckboxInput id={"canEditPlants"} label={"Edycja"} />
          <CheckboxInput id={"canMovePlants"} label={"Przenoszenie"} />
          <CheckboxInput id={"canRemovePlants"} label={"Usuwanie"} />
        </PermissionsGroup>

        <PermissionsGroup>
          <PermissionsGroupHeder>Typy zadań</PermissionsGroupHeder>
          <CheckboxInput
            id={"canCreateCustomActionTypes"}
            label={"Dodawanie"}
          />
          <CheckboxInput id={"canEditCustomActionTypes"} label={"Edycja"} />
          <CheckboxInput id={"canDeleteCustomActionTypes"} label={"Usuwanie"} />
        </PermissionsGroup>
        {isSuccess ? <FormSuccess>Sukces</FormSuccess> : null}
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ActionButton type="submit">Zapisz</ActionButton>
        )}
      </GuestUserPermissionsFormWrapper>
    </Formik>
  );
};
export default GuestUserPermissionsForm;
