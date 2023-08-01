import {
  HeaderAndImgPlaceWrapper,
  HeaderPlace,
  ImgPlace,
  PlacesWrapper,
} from "./Places.styles";
import placesImg from "../../../Assets/PlaceHouse.svg";

const Places = () => {
  return (
    <PlacesWrapper>
      <HeaderAndImgPlaceWrapper>
        <HeaderPlace>Sypialnia</HeaderPlace>
        <ImgPlace src={placesImg} />
      </HeaderAndImgPlaceWrapper>
    </PlacesWrapper>
  );
};

export default Places;
