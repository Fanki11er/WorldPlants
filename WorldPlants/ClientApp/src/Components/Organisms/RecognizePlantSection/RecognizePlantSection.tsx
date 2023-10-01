import { PlantRecognizeResult } from "../../../Interfaces/PlantRecognizeResult";
import {
  SectionHeaderWithIcon,
  SectionHeaderWithIconIcon,
} from "../../Atoms/SectionHeaderWithIcon/SectionHeaderWithIcon";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import RecognizedResultsList from "../../Molecules/RecognizedResultsList/RecognizedResultsList";
import RecognizerImagesForm from "../../Molecules/RecognizerImagesForm/RecognizerImagesForm";
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
      <SectionHeaderWithIcon>
        <SectionHeaderWithIconIcon src={""} />
        Rozpoznawanie roślin
      </SectionHeaderWithIcon>
      <RecognizerImagesForm getResults={handleSetRecognizedData} />
      {<RecognizedResultsList results={recognizedResultsData} />}
    </SettingsSectionWrapper>
  );
};

export default RecognizePlantSection;
