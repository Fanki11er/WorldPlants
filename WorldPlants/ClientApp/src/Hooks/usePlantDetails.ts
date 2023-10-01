import useAxiosPrivate from "./useAxiosPrivate";
import { apiEndpoints } from "../Api/endpoints";
import { useQuery } from "react-query";
import { PLantsDetailsDto } from "../Interfaces/PlantDetailsDto";
import useQueryKey from "./useQueryKey";

const usePlantDetails = (detailsId: number | undefined) => {
  const { getPlantDetails } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const { plantDetailsQueryKey } = useQueryKey();
  const { error, isLoading, data } = useQuery<PLantsDetailsDto>(
    plantDetailsQueryKey(detailsId),
    async () => {
      const result = await axiosPrivate.get(getPlantDetails(detailsId));
      return result.data;
    },
    {
      enabled: !!detailsId,
      staleTime: 1000 * 60 * 5,
    }
  );

  return {
    plantDetails: data,
    detailsError: error,
    areDetailsLoading: isLoading,
  };
};

export default usePlantDetails;
