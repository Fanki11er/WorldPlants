import { useMutation, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { paths } from "../../../Router/paths";
import {
  GuestAccountsListWrapper,
  GuestListItemWrapper,
  HeaderGuestListItem,
} from "./GuestAccountsList.styles";
import { ChangeGuestUserStatusDto } from "../../../Interfaces/ChangeGuestUserStatusDto";
import { GuestUserDto } from "../../../Interfaces/GuestUserDto";
import { SideMenuLink } from "../../Atoms/Buttons/Buttons";
import ToggleInput from "../ToggleInput/ToggleInput";
import useQueryKey from "../../../Hooks/useQueryKey";

interface Props {
  guestAccounts: GuestUserDto[];
}

const GuestAccountsList = (props: Props) => {
  const { guestAccounts } = props;
  const { authorized, guestUserPermissions } = paths;
  const { changeGuestUserStatus } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { guestAccountsQueryKey } = useQueryKey();

  const { mutate } = useMutation({
    mutationFn: (dto: ChangeGuestUserStatusDto) => {
      return axiosPrivate.post(changeGuestUserStatus, dto);
    },
    onSuccess: () => {
      client.invalidateQueries(guestAccountsQueryKey());
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
    <GuestAccountsListWrapper>
      {renderGuestAccounts(guestAccounts)}
    </GuestAccountsListWrapper>
  );
};

export default GuestAccountsList;
