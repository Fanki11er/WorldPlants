import GuestAccounts from "../../Components/Organisms/GuestAccounts/GuestAccounts";
import { OwnerSettingsViewWrapper } from "./OwnerSettingsView.styles";

const OwnerSettingsView = () => {
  return (
    <OwnerSettingsViewWrapper>
      <div>Nawigacja</div>
      <GuestAccounts />
    </OwnerSettingsViewWrapper>
  );
};

export default OwnerSettingsView;
