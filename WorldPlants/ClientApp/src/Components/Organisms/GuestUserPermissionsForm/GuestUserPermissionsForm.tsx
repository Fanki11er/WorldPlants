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
        canWaterPlants: guestUserPermissions.canWaterPlants,
        canMistPlants: guestUserPermissions.canMistPlants,
        canFertilizePlants: guestUserPermissions.canFertilizePlants,
        canReplantPlants: guestUserPermissions.canReplantPlants,
        canCutPlants: guestUserPermissions.canCutPlants,
        canMovePlants: guestUserPermissions.canMovePlants,
        canAddPlants: guestUserPermissions.canAddPlants,
        canRemovePlants: guestUserPermissions.canRemovePlants,
        canEditPlants: guestUserPermissions.canEditPlants,
        canAddSites: guestUserPermissions.canAddSites,
        canRemoveSites: guestUserPermissions.canRemoveSites,
        canEditSites: guestUserPermissions.canEditSites,
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
        {isSuccess ? <div>Success</div> : null}
        <PermissionsGroup>
          <PermissionsGroupHeder>Zadania</PermissionsGroupHeder>
          <CheckboxInput id={"canWaterPlants"} label={"Podlewanie"} />
          <CheckboxInput id={"canFertilizePlants"} label={"Nawożenie"} />
          <CheckboxInput id={"canCutPlants"} label={"Przycinanie"} />
          <CheckboxInput id={"canReplantPlants"} label={"Przesadzanie"} />
          <CheckboxInput id={"canMistPlants"} label={"Zwilżanie"} />
        </PermissionsGroup>
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

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <button type="submit">Zapisz</button>
        )}
      </GuestUserPermissionsFormWrapper>
    </Formik>
  );
};
export default GuestUserPermissionsForm;
