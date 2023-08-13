import {
  HeaderAndImgTypesOfPlacesItemListWrapper,
  HeaderTypesOfPlacesItemList,
  ImgTypesOfPlacesItemList,
} from "./TypesOfPlacesItemList.styles";
import placesImg from "../../../Assets/PlaceHouse.svg";

const TypesOfPlacesItemList = () => {
  return (
    <HeaderAndImgTypesOfPlacesItemListWrapper>
      <HeaderAndImgTypesOfPlacesItemListWrapper>
        <HeaderTypesOfPlacesItemList>Sypialnia</HeaderTypesOfPlacesItemList>
        <ImgTypesOfPlacesItemList src={placesImg} />
      </HeaderAndImgTypesOfPlacesItemListWrapper>
    </HeaderAndImgTypesOfPlacesItemListWrapper>
  );
};

export default TypesOfPlacesItemList;
