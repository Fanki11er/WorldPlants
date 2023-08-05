import { HeaderAddPlacesForPlants } from "../AddPlacesForPlants/AddPlacesForPlants.styles";
import {
  HeaderHowManyPlants,
  HeaderPlantPlacesAdded,
  PlantPlacesAddedListItemWrapper,
} from "./PlantPlacesAddedListItem.styles";

const PlantPlacesAddedListItem = () => {
  return (
    <PlantPlacesAddedListItemWrapper>
      <HeaderPlantPlacesAdded>Sypialnia</HeaderPlantPlacesAdded>
      <HeaderHowManyPlants>0 Roślin</HeaderHowManyPlants>
    </PlantPlacesAddedListItemWrapper>
  );
};

export default PlantPlacesAddedListItem;
