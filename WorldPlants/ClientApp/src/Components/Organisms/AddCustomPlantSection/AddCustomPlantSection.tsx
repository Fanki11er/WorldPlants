import { apiEndpoints } from "../../../Api/endpoints";
import useSearchPhrase from "../../../Hooks/useSearchPhrase";
import { PlantCurrentSettingsDto } from "../../../Interfaces/PlantCurrentSettingsDto";
import { PlantRecognizeResult } from "../../../Interfaces/PlantRecognizeResult";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import AddPlantForm from "../../Molecules/AddPlantForm/AddPlantForm";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const AddCustomPlantSection = () => {
  const { addPlant } = apiEndpoints;
  const { plantRecognizeResult } = useSearchPhrase();

  const convertResultToSettings = (result: PlantRecognizeResult) => {
    return {
      name: result.name,
      imageUrl:
        result.images && result.images.length ? result.images[0] : undefined,
    } as PlantCurrentSettingsDto;
  };
  return (
    <SettingsSectionWrapper>
      <GoToTop />
      <AddPlantForm
        currentSettings={
          plantRecognizeResult
            ? convertResultToSettings(plantRecognizeResult)
            : null
        }
        submitEndpoint={addPlant}
      />
      <ActionButton type="submit" form="AddPlantForm">
        Zapisz
      </ActionButton>
    </SettingsSectionWrapper>
  );
};
export default AddCustomPlantSection;
