import { SearchPlantResultsDto } from "../../../Interfaces/SearchPlantResultsDto";
import SunlightIcon from "../SunlightIcon/SunlightIcon";
import WateringIcon from "../WateringIcon/WateringIcon";
import {
  AddPlantSearchOrRecognizeResultsListItem,
  AddPlantSearchOrRecognizeResultsListItemContentWrapper,
  AddPlantSearchOrRecognizeResultsListItemIconsWrapper,
  AddPlantSearchOrRecognizeResultsListItemImage,
  AddPlantSearchOrRecognizeResultsListItemLink,
  AddPlantSearchOrRecognizeResultsListItemName,
  AddPlantSearchOrRecognizeResultsListItemScientificName,
  AddPlantSearchOrRecognizeResultsWrapper,
} from "./AddPlantSearchOrRecognizeResults.styles";
import imgFallback from "../../../Assets/ImageFallback.svg";

interface Props {
  results: SearchPlantResultsDto[];
}
const AddPlantSearchOrRecognizeResults = (props: Props) => {
  const { results } = props;
  const renderResults = (searchPlantsResults: SearchPlantResultsDto[]) => {
    return searchPlantsResults.map((result) => {
      return (
        <AddPlantSearchOrRecognizeResultsListItem key={result.id}>
          <AddPlantSearchOrRecognizeResultsListItemLink
            to={result.id.toString()}
          >
            <AddPlantSearchOrRecognizeResultsListItemImage
              src={result.defaultImage ? result.defaultImage : imgFallback}
            />
            <AddPlantSearchOrRecognizeResultsListItemContentWrapper>
              <AddPlantSearchOrRecognizeResultsListItemName>
                {result.commonName}
              </AddPlantSearchOrRecognizeResultsListItemName>
              <AddPlantSearchOrRecognizeResultsListItemScientificName>
                {result.scientificName}
              </AddPlantSearchOrRecognizeResultsListItemScientificName>
              <AddPlantSearchOrRecognizeResultsListItemIconsWrapper>
                <WateringIcon wateringLevel={result.watering} />
                <SunlightIcon sunlightLevel={result.sunlight} />
              </AddPlantSearchOrRecognizeResultsListItemIconsWrapper>
            </AddPlantSearchOrRecognizeResultsListItemContentWrapper>
          </AddPlantSearchOrRecognizeResultsListItemLink>
        </AddPlantSearchOrRecognizeResultsListItem>
      );
    });
  };

  return (
    <AddPlantSearchOrRecognizeResultsWrapper>
      {results && renderResults(results)}
    </AddPlantSearchOrRecognizeResultsWrapper>
  );
};

export default AddPlantSearchOrRecognizeResults;
