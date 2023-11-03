import { Outlet } from "react-router-dom";
import AuthProvider from "../../Providers/AuthProvider";
import { RouteLayoutWrapper } from "./RouteLayout.styles";
import PermissionsProvider from "../../Providers/PermissionsProvider";
import Footer from "../../Components/Molecules/Footer/Footer";
import { useQuery } from "react-query";
import useQueryKey from "../../Hooks/useQueryKey";
import { apiEndpoints } from "../../Api/endpoints";
import axios from "../../Api/axios";
import FormRequestError from "../../Components/Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../Utils/Utils";

const RouteLayout = () => {
  const { serverStatus } = apiEndpoints;
  const { serverStatusQueryKey } = useQueryKey();
  const { error } = useQuery(
    serverStatusQueryKey(),
    async () => {
      const result = await axios.get(serverStatus);
      return result.data;
    },
    {
      cacheTime: Infinity,
    }
  );
  return (
    <RouteLayoutWrapper>
      <AuthProvider>
        <PermissionsProvider>
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : (
            <Outlet />
          )}

          <Footer />
        </PermissionsProvider>
      </AuthProvider>
    </RouteLayoutWrapper>
  );
};

export default RouteLayout;
