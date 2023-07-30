import { PropsWithChildren, createContext, useMemo } from "react";
import { useSessionStorage } from "../Hooks/useSessionStorage";
import { AuthenticatedUser } from "../Interfaces/AuthenticatedUser";

interface ContextValue {
  login: (values: AuthenticatedUser) => void;
  user: AuthenticatedUser | null;
  logout: () => void;
}

export const AuthContext = createContext<ContextValue>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_values: AuthenticatedUser) => {},
  user: null,
  logout: () => {},
});

const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { storedValue, setValue } = useSessionStorage<AuthenticatedUser | null>(
    "user"
  );

  const login = (value: AuthenticatedUser) => {
    setValue(value);
  };

  const logout = () => {
    setValue(null);
    console.log("Logout");
  };

  const values = useMemo(
    () => ({
      login,
      user: storedValue,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storedValue]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
