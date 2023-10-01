import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import AddPlantForm from "../AddPlantForm/AddPlantForm";
import { useParams } from "react-router-dom";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { PlantCurrentSettingsDto } from "../../../Interfaces/PlantCurrentSettingsDto";
import useQueryKey from "../../../Hooks/useQueryKey";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";

const PlantSettingsSection = () => {
  const { plantSettings } = apiEndpoints;
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { plantSettingsQueryKey, plantHeaderInformationQueryKey } =
    useQueryKey();
  const {
    data: plantCurrentSettings,
    error,
    isLoading,
  } = useQuery<PlantCurrentSettingsDto>(
    plantSettingsQueryKey(plantId),
    async () => {
      const response = await axiosPrivate.get(plantSettings(plantId));
      return response.data;
    },
    {
      enabled: !!plantId,
    }
  );
  return (
    <SettingsSectionWrapper>
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {plantCurrentSettings && (
        <AddPlantForm
          currentSettings={plantCurrentSettings}
          submitEndpoint={() => plantSettings(plantId)}
          invalidateQueries={[
            plantSettingsQueryKey(plantId),
            plantHeaderInformationQueryKey(plantId),
          ]}
        />
      )}
    </SettingsSectionWrapper>
  );
};
export default PlantSettingsSection;
