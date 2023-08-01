import { NavigationLink } from "../../Atoms/Buttons/Buttons";
import {
  GuestListItemWrapper,
  HeaderGuestListItem,
} from "./GuestListItem.styles";

const GuestListItem = () => {
  return (
    <GuestListItemWrapper>
      <HeaderGuestListItem>Ewelina</HeaderGuestListItem>
      <HeaderGuestListItem>ewela@poczta.onet.pl</HeaderGuestListItem>
      <NavigationLink to={"/"}>Ustawienia</NavigationLink>
    </GuestListItemWrapper>
  );
};

export default GuestListItem;
