import { useContext } from "react";
import { PermissionsContext } from "../Providers/PermissionsProvider";

const usePermissions = () => {
  return useContext(PermissionsContext);
};

export default usePermissions;
