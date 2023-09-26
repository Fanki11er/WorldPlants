import { useParams } from "react-router-dom";
import { PlantRecognizeResult } from "../../../Interfaces/PlantRecognizeResult";
import { paths } from "../../../Router/paths";
import {
  RecognizedResultsListItem,
  RecognizedResultsListItemDescription,
  RecognizedResultsListItemHeader,
  RecognizedResultsListItemImage,
  RecognizedResultsListItemImagesWrapper,
  RecognizedResultsListItemLink,
  RecognizedResultsListItemProbability,
  RecognizedResultsListWrapper,
} from "./RecognizedResultsList.styles";
import useSearchPhrase from "../../../Hooks/useSearchPhrase";

interface Props {
  results: PlantRecognizeResult[];
}
const RecognizedResultsList = (props: Props) => {
  const { results } = props;
  const { authorized, addPlant } = paths;
  const { siteId } = useParams();
  const { handleSetSearchPhrase } = useSearchPhrase();

  const renderImages = (images: string[]) => {
    return images.map((image, index) => {
      return <RecognizedResultsListItemImage $imageUrl={image} key={index} />;
    });
  };

  const renderResults = (results: PlantRecognizeResult[]) => {
    return results.map((result) => {
      return (
        <RecognizedResultsListItem key={result.id}>
          <RecognizedResultsListItemLink
            to={`${authorized}/${addPlant}/${siteId}`}
            onClick={() => handleSetSearchPhrase(result.name)}
          >
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
          </RecognizedResultsListItemLink>
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
