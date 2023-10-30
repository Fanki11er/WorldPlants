import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { QrGeneratorWrapper } from "./PlantSettingsSection.styles";
import { ActionButton, GenerateQRButton } from "../../Atoms/Buttons/Buttons";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import GoToTop from "../GoToTop/GoToTop";

const PlantSettingsSection = () => {
  const { plantSettings, createQrCode } = apiEndpoints;
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const {
    plantSettingsQueryKey,
    plantHeaderInformationQueryKey,
    savedQrCodesQueryKey,
  } = useQueryKey();
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

  const {
    mutate,
    isSuccess,
    error: mutationError,
    isLoading: isMutating,
  } = useMutation({
    mutationFn: async (plantId: string | undefined) => {
      const result = await axiosPrivate.post(createQrCode(plantId), undefined);
      return result.data;
    },
    onSuccess: () => {
      client.invalidateQueries(savedQrCodesQueryKey());
    },
  });
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <QrGeneratorWrapper>
        <GenerateQRButton onClick={() => mutate(plantId)}>
          Generuj kod QR
        </GenerateQRButton>
        {mutationError ? (
          <FormRequestError errorValues={getErrorMessages(mutationError)} />
        ) : null}
        {isMutating && <LoadingIndicator />}
        {isSuccess && <FormSuccess>Wygenerowano</FormSuccess>}
      </QrGeneratorWrapper>
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
      {plantCurrentSettings && (
        <ActionButton type="submit" form="AddPlantForm">
          Zapisz
        </ActionButton>
      )}
    </SettingsSectionWrapper>
  );
};
export default PlantSettingsSection;
