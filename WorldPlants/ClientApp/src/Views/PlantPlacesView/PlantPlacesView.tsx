import AddedPlants from "../../Components/Organisms/AddedPlants/AddedPlants";
import { PlantPlacesViewWrapper } from "./PlantPlacesView.styles";

const PlantPlacesView = () => {
  return (
    <PlantPlacesViewWrapper>
      <div>Nawigacja</div>
      <AddedPlants />
    </PlantPlacesViewWrapper>
  );
};

export default PlantPlacesView;
