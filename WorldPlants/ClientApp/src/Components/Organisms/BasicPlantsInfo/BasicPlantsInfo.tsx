import { OptionsWrapper } from "../../Atoms/OptionsWrapper/OptionsWrapper.styles";
import { PlantsWrapper } from "../../Atoms/PlantsWrapper/PlantsWrapper.styles";
import { TaskWrapper } from "../../Atoms/TaskWrapper/TaskWrapper";
import {
  BasicPlantsInfoHeaderWrapper,
  BasicPlantsInfoImg,
  BasicPlantsInfoImgWrapper,
  BasicPlantsInfoSunHeader,
  BasicPlantsInfoSunImg,
  BasicPlantsInfoWateringHeader,
  BasicPlantsInfoWateringImg,
  BasicPlantsInfoWrapper,
} from "./BasicPlantsInfo.styles";
import ImgBasicPlantInfo from "../../../Assets/Apple.svg";
import ImgBasicPlantsInfoWatering from "../../../Assets/WateringsThree.svg";
import ImgBasicPlantsInfoSun from "../../../Assets/Sun.svg";

const BasicPlantInfo = () => {
  return (
    <BasicPlantsInfoWrapper>
      <PlantsWrapper>
        <TaskWrapper>
          <BasicPlantsInfoImg src={ImgBasicPlantInfo} alt="ImgBasicPlantInfo" />
          <BasicPlantsInfoHeaderWrapper>
            <BasicPlantsInfoWateringHeader>
              Jabłoń
            </BasicPlantsInfoWateringHeader>
            <BasicPlantsInfoSunHeader>Kortland</BasicPlantsInfoSunHeader>
          </BasicPlantsInfoHeaderWrapper>

          <BasicPlantsInfoImgWrapper>
            <BasicPlantsInfoWateringImg
              src={ImgBasicPlantsInfoWatering}
              alt="ImgBasicPlantsInfoWatering"
            />
            <BasicPlantsInfoSunImg
              src={ImgBasicPlantsInfoSun}
              alt="ImgBasicPlantsInfoSun"
            />
          </BasicPlantsInfoImgWrapper>
        </TaskWrapper>
        <TaskWrapper />
        <TaskWrapper />
        <TaskWrapper />
      </PlantsWrapper>
    </BasicPlantsInfoWrapper>
  );
};

export default BasicPlantInfo;
