import { createContext, PropsWithChildren, useMemo, useEffect } from "react";
import { useSessionStorage } from "../Hooks/useSessionStorage";
import { GuestUserPermissionsDto } from "../Interfaces/GuestUserPermissionsDto";
import { useQuery } from "react-query";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { ACTIONS_PERMISSIONS } from "../Constants/Constants";
import useAuth from "../Hooks/useAuth";
import { apiEndpoints } from "../Api/endpoints";

interface ContextValue {
  permissions: GuestUserPermissionsDto | null;
  isLoading: boolean;
  isError: boolean;
}

export const PermissionsContext = createContext<ContextValue>({
  permissions: null,
  isLoading: true,
  isError: false,
});

const PermissionsProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const { getUserPermissions } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const { storedValue, setValue } =
    useSessionStorage<GuestUserPermissionsDto | null>("permissions");

  const { isLoading, error } = useQuery<GuestUserPermissionsDto>(
    ACTIONS_PERMISSIONS,
    async () => {
      const result = await axiosPrivate.get(getUserPermissions);
      return result.data;
    },
    {
      enabled: user !== null,
      onSuccess: (data) => {
        setValue(data);
      },
    }
  );

  useEffect(() => {
    if (!user && storedValue) {
      setValue(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const values = useMemo(
    () => ({
      permissions: storedValue,
      isLoading,
      isError: !!error,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storedValue, isLoading, error]
  );

  return (
    <PermissionsContext.Provider value={values}>
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;
