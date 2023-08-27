import { AddPlantsWrapper } from "../../Atoms/AddPlantsWrapper/AddPlantsWrapper.styles";
import {
  PlantDetailsElementHeader,
  PlantDetailsHeaderWrapper,
  PlantDetailsImg,
  PlantDetailsImgAndButtonWrapper,
  PlantDetailsNameHeader,
  PlantDetailsSpan,
  PlantDetailsWrapper,
} from "./PlantDetails.styles";
import ImgPlantDetails from "../../../Assets/Apple.svg";
import { ActionButton } from "../../Atoms/Buttons/Buttons";

const PlantDetails = () => {
  return (
    <PlantDetailsWrapper>
      <AddPlantsWrapper>
        <PlantDetailsImgAndButtonWrapper>
          <PlantDetailsImg src={ImgPlantDetails} alt="ImgPlantDetails" />
          <ActionButton>Dodaj</ActionButton>
        </PlantDetailsImgAndButtonWrapper>

        <PlantDetailsHeaderWrapper>
          <PlantDetailsNameHeader>Jabłoń</PlantDetailsNameHeader>
          <PlantDetailsElementHeader>Kortland</PlantDetailsElementHeader>
          <PlantDetailsSpan>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
          </PlantDetailsSpan>
        </PlantDetailsHeaderWrapper>
      </AddPlantsWrapper>
    </PlantDetailsWrapper>
  );
};

export default PlantDetails;
