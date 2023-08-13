import {
  AddPlacesForPlantsText,
  AddPlacesForPlantsWrapper,
  HeaderAddPlacesForPlants,
} from "./AddPlacesForPlants.styles";

const AddPlacesForPlants = () => {
  return (
    <AddPlacesForPlantsWrapper>
      <HeaderAddPlacesForPlants>
        Dodaj miejsca dla roślin
      </HeaderAddPlacesForPlants>
      <AddPlacesForPlantsText>
        Tutaj będzie znajdować się lista miejsc w których cieszyć sie będziesz
        swoimi roślinami
      </AddPlacesForPlantsText>
    </AddPlacesForPlantsWrapper>
  );
};

export default AddPlacesForPlants;
