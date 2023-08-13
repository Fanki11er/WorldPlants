import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { paths } from "../../../Router/paths";
import {
  GuestAccountsListWrapper,
  GuestListItemWrapper,
  HeaderGuestListItem,
} from "./GuestAccountsList.styles";
import { GUEST_ACCOUNTS } from "../../../Constants/Constants";
import { ChangeGuestUserStatusDto } from "../../../Interfaces/ChangeGuestUserStatusDto";
import { GuestUserDto } from "../../../Interfaces/GuestUserDto";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import ToggleInput from "../ToggleInput/ToggleInput";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import NoListContentInfo from "../NoListContentInfo/NoListContentInfo";

const GuestAccountsList = () => {
  const axiosPrivate = useAxiosPrivate();
  const { getGuestUsers, changeGuestUserStatus } = apiEndpoints;
  const { guestUserPermissions, authorized } = paths;
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<GuestUserDto[]>(
    GUEST_ACCOUNTS,
    async () => {
      const result = await axiosPrivate.get(getGuestUsers);
      return result.data;
    }
  );
  const { mutate } = useMutation({
    mutationFn: (dto: ChangeGuestUserStatusDto) => {
      return axiosPrivate.post(changeGuestUserStatus, dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(GUEST_ACCOUNTS);
    },
  });

  const toggleGuestUserStatus = (id: string, newStatus: boolean) => {
    const dto: ChangeGuestUserStatusDto = {
      UserId: id,
      NewStatus: newStatus,
    };
    mutate(dto);
  };

  const renderGuestAccounts = (data: GuestUserDto[]) => {
    return data.map((user) => {
      const { id, email, name, isActive } = user;
      return (
        <GuestListItemWrapper key={id}>
          <HeaderGuestListItem>{name}</HeaderGuestListItem>
          <HeaderGuestListItem>{email}</HeaderGuestListItem>
          <ToggleInput
            isActive={isActive}
            id={id}
            toggle={toggleGuestUserStatus}
          />
          <SideMenuLink to={`${authorized}/${guestUserPermissions}/${id}`}>
            Ustawienia
          </SideMenuLink>
        </GuestListItemWrapper>
      );
    });
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && data.length ? (
        <GuestAccountsListWrapper>
          {renderGuestAccounts(data)}
        </GuestAccountsListWrapper>
      ) : (
        <NoListContentInfo
          informationHeaderText={"Brak kont gości"}
          informationText={"Tu będą widoczne utworzone konta gości. "}
        />
      )}
    </>
  );
};

export default GuestAccountsList;
