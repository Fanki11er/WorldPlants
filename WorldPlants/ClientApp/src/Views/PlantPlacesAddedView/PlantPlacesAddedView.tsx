import PlantPlacesAddedList from "../../Components/Organisms/PlantPlacesAddedList/PlantPlacesAddedList";
import { PlantPlacesAddedViewWrapper } from "./PlantPlacesAddedView.styles";

const PlantPlacesAddedView = () => {
  return (
    <PlantPlacesAddedViewWrapper>
      <div>Nawigacja</div>
      <PlantPlacesAddedList />
    </PlantPlacesAddedViewWrapper>
  );
};

export default PlantPlacesAddedView;
