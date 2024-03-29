import { PLantsDetailsDto } from "../../../Interfaces/PlantDetailsDto";
import PlantDetailsWithIconsSection from "../PlantDetailsWithIconsSection/PlantDetailsWithIconsSection";
import {
  PLantsDetailsImage,
  PlantDetailsDescription,
  PlantDetailsHeaderSection,
  PlantDetailsName,
  PlantDetailsOtherName,
  PlantDetailsScientificName,
  PlantDetailsWrapper,
} from "./PlantDetails.styles";

interface Props {
  plantDetails: PLantsDetailsDto;
}

const PlantDetails = (props: Props) => {
  const { plantDetails } = props;
  return (
    <PlantDetailsWrapper>
      <PlantDetailsHeaderSection>
        {plantDetails.defaultImage && (
          <PLantsDetailsImage $imageUrl={plantDetails.defaultImage} />
        )}

        <PlantDetailsName>{plantDetails.commonName}</PlantDetailsName>
        <PlantDetailsScientificName>
          {plantDetails.scientificName.length
            ? plantDetails.scientificName[0]
            : ""}
        </PlantDetailsScientificName>

        {plantDetails.otherName.length ? (
          <PlantDetailsOtherName>
            {"Znana również jako: " + plantDetails.otherName.join(", ")}
          </PlantDetailsOtherName>
        ) : null}
        <PlantDetailsDescription>
          {plantDetails.description ? plantDetails.description : ""}
        </PlantDetailsDescription>
      </PlantDetailsHeaderSection>
      <PlantDetailsWithIconsSection plantDetails={plantDetails} />
    </PlantDetailsWrapper>
  );
};

export default PlantDetails;
