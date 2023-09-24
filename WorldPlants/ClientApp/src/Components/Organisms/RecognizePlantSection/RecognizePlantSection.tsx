import { PlantRecognizeResult } from "../../../Interfaces/PlantRecognizeResult";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import RecognizedResultsList from "../../Molecules/RecognizedResultsList/RecognizedResultsList";
import RecognizerImagesForm from "../../Molecules/RecognizerImagesForm/RecognizerImagesForm";
import { RecognizePlantSectionWrapper } from "./RecognizePlantSection.styles";
import { useState } from "react";

const RecognizePlantSection = () => {
  const [recognizedResultsData, setRecognizedResultsData] = useState<
    PlantRecognizeResult[]
  >([]);

  const handleSetRecognizedData = (data: PlantRecognizeResult[]) => {
    setRecognizedResultsData(data);
  };
  return (
    <SettingsSectionWrapper>
      <RecognizerImagesForm getResults={handleSetRecognizedData} />
      {<RecognizedResultsList results={recognizedResultsData} />}
    </SettingsSectionWrapper>
  );
};

export default RecognizePlantSection;
