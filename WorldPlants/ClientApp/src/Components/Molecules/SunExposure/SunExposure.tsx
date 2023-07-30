import { HeaderAndImgSunExposureWrapper, HeaderSunExposure, ImgSunExposure, SunExposureWrapper, TextSunExposure } from "./SunExposure.styles"
import imgSun from "../../../Assets/Sun.svg";
import imgShade from "../../../Assets/Shade.svg";
import imgDarkness from "../../../Assets/Darkness.svg";
import imgPenumbra from "../../../Assets/Penumbra.svg";

const SunExposure = () => {
    return (
        <>
            <SunExposureWrapper>
                <HeaderAndImgSunExposureWrapper>
                    <HeaderSunExposure>Słońce</HeaderSunExposure>
                    <ImgSunExposure src={imgSun} alt="imgSun"/>
                    <TextSunExposure>Lorem ipsum</TextSunExposure>
                </HeaderAndImgSunExposureWrapper>
            </SunExposureWrapper>

            <SunExposureWrapper>
                <HeaderAndImgSunExposureWrapper>
                    <HeaderSunExposure>Cień</HeaderSunExposure>
                    <ImgSunExposure src={imgShade} alt="imgShade"/>
                    <TextSunExposure>Lorem ipsum</TextSunExposure>
                </HeaderAndImgSunExposureWrapper>
            </SunExposureWrapper>
           
            <SunExposureWrapper>
                <HeaderAndImgSunExposureWrapper>
                    <HeaderSunExposure>Ciemność</HeaderSunExposure>
                    <ImgSunExposure src={imgDarkness} alt="imgDarkness"/>
                    <TextSunExposure>Lorem ipsum</TextSunExposure>
                </HeaderAndImgSunExposureWrapper>
            </SunExposureWrapper>
            
            <SunExposureWrapper>
                <HeaderAndImgSunExposureWrapper>
                    <HeaderSunExposure>Półcień</HeaderSunExposure>
                    <ImgSunExposure src={imgPenumbra} alt="imgPenumbra"/>
                    <TextSunExposure>Lorem ipsum</TextSunExposure>
                </HeaderAndImgSunExposureWrapper>
            </SunExposureWrapper>
        </>
       
    )
}

export default SunExposure;