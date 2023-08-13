import PlantPlacesAddedListItem from "../../Molecules/PlantPlacesAddedListItem/PlantPlacesAddedListItem";
import { PlantPlacesAddedListWrapper } from "./PlantPlacesAddedList.styles";

const PlantPlacesAddedList = () => {
  return (
    <PlantPlacesAddedListWrapper>
      <PlantPlacesAddedListItem />
      <PlantPlacesAddedListItem />
    </PlantPlacesAddedListWrapper>
  );
};

export default PlantPlacesAddedList;
