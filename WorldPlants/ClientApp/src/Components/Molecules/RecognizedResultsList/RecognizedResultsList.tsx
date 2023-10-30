import { useNavigate, useParams } from "react-router-dom";
import { PlantRecognizeResult } from "../../../Interfaces/PlantRecognizeResult";
import { paths } from "../../../Router/paths";
import {
  RecognizedResultsListItem,
  RecognizedResultsListItemButtonsWrapper,
  RecognizedResultsListItemDescription,
  RecognizedResultsListItemHeader,
  RecognizedResultsListItemImage,
  RecognizedResultsListItemImagesWrapper,
  RecognizedResultsListItemLink,
  RecognizedResultsListItemProbability,
  RecognizedResultsListWrapper,
} from "./RecognizedResultsList.styles";
import useSearchPhrase from "../../../Hooks/useSearchPhrase";
import { ActionButton } from "../../Atoms/Buttons/Buttons";

interface Props {
  results: PlantRecognizeResult[];
}
const RecognizedResultsList = (props: Props) => {
  const { results } = props;
  const { authorized, addPlant, addCustomPlant } = paths;
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { handleSetSearchPhrase, handleSetPlantRecognizeResult } =
    useSearchPhrase();

  const renderImages = (images: string[]) => {
    return images.map((image, index) => {
      return <RecognizedResultsListItemImage $imageUrl={image} key={index} />;
    });
  };

  const renderResults = (results: PlantRecognizeResult[]) => {
    return results.map((result) => {
      return (
        <RecognizedResultsListItem key={result.id}>
          <RecognizedResultsListItemProbability>
            {result.probability}
          </RecognizedResultsListItemProbability>
          <RecognizedResultsListItemHeader>
            {result.name}
          </RecognizedResultsListItemHeader>
          <RecognizedResultsListItemDescription>
            {result.description}
          </RecognizedResultsListItemDescription>
          <RecognizedResultsListItemImagesWrapper>
            {result.images && renderImages(result.images)}
          </RecognizedResultsListItemImagesWrapper>
          <RecognizedResultsListItemButtonsWrapper>
            <ActionButton
              onClick={() => {
                handleSetSearchPhrase(result.name);
                navigate(`${authorized}/${addPlant}/${siteId}`);
              }}
            >
              Wyszukaj
            </ActionButton>
            <ActionButton
              onClick={() => {
                handleSetPlantRecognizeResult(result);
                navigate(
                  `${authorized}/${addPlant}/${siteId}/${addCustomPlant}`
                );
              }}
            >
              Dodaj
            </ActionButton>
          </RecognizedResultsListItemButtonsWrapper>
        </RecognizedResultsListItem>
      );
    });
  };
  return (
    <RecognizedResultsListWrapper>
      {renderResults(results)}
    </RecognizedResultsListWrapper>
  );
};

export default RecognizedResultsList;
