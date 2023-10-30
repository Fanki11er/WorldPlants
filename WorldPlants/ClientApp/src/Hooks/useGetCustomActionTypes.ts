import { useQuery } from "react-query";
import { apiEndpoints } from "../Api/endpoints";
import useAxiosPrivate from "./useAxiosPrivate";
import useQueryKey from "./useQueryKey";
import { CustomActionTypeInformation } from "../Interfaces/CustomActionTypeInformation";

const useGetCustomActionTypes = () => {
  const axiosPrivate = useAxiosPrivate();
  const { getCustomActionTypesInformation } = apiEndpoints;
  const { customActionTypesQueryKey } = useQueryKey();

  const {
    data: customActionsTypes,
    error: customActionTypesError,
    isLoading: customActionTypesAreLoading,
  } = useQuery<CustomActionTypeInformation[]>(
    customActionTypesQueryKey(),
    async () => {
      const result = await axiosPrivate.get(getCustomActionTypesInformation);
      return result.data;
    },
    { cacheTime: 1000 * 60 * 10 }
  );

  return {
    customActionsTypes,
    customActionTypesAreLoading,
    customActionTypesError,
  };
};

export default useGetCustomActionTypes;
