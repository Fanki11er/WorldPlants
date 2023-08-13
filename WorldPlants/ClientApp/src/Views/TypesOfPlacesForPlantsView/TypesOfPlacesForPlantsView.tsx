import TypesOfPlacesForPlantsList from "../../Components/Organisms/TypesOfPlacesForPlantsList/TypesOfPlacesForPlantsList";
import PlacesList from "../../Components/Organisms/TypesOfPlacesForPlantsList/TypesOfPlacesForPlantsList";
import { TypesOfPlacesForPlantsViewWrapper } from "./TypesOfPlacesForPlantsView.styles";

const TypesOfPlacesForPlantsView = () => {
  return (
    <TypesOfPlacesForPlantsViewWrapper>
      <TypesOfPlacesForPlantsList />
    </TypesOfPlacesForPlantsViewWrapper>
  );
};

export default TypesOfPlacesForPlantsView;
