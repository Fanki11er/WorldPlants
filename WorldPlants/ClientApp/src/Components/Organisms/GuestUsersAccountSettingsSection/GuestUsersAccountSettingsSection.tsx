import { Navigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper";
import {
  SettingsSectionHeader,
  SettingsSectionWrapper,
} from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { paths } from "../../../Router/paths";
import GuestAccountsList from "../../Molecules/GuestAccountsList/GuestAccountsList";

const GuestUsersAccountSettingsSection = () => {
  const { user } = useAuth();
  const { authorized, userSettings } = paths;
  if (user?.accountType !== "Owner") {
    return <Navigate to={`${authorized}/${userSettings}`} />;
  }
  return (
    <SettingsSectionWrapper>
      <SettingsSectionHeader>Konta gości</SettingsSectionHeader>
      <OptionsWrapper>
        <GuestAccountsList />
      </OptionsWrapper>
    </SettingsSectionWrapper>
  );
};

export default GuestUsersAccountSettingsSection;
