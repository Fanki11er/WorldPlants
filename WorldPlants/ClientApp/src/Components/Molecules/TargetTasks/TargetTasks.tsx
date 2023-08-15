import {
  BlueCircleImg,
  BlueCircleImgWrapper,
  HeaderPlant,
  HeaderSpace,
  HeaderWrapper,
  ImgAndHeaderWrapper,
  ImgPlant,
  ImgTree,
  ImgTreeWrapper,
  TargetTasksWrapper,
} from "./TargetTasks.styles";
import taskPlantImg from "../../../Assets/Plant.svg";
import treeImg from "../../../Assets/Tree.svg";
import plantInAVaseImg from "../../../Assets/PlantInAVase.svg";
import ImgBlueCircle from "../../../Assets/BlueCircle.svg";

const TargetTasks = () => {
  return (
    <TargetTasksWrapper>
      <ImgAndHeaderWrapper>
        <ImgPlant src={taskPlantImg} alt="taskPlantImg" />
        <HeaderWrapper>
          <HeaderPlant>Tulipan</HeaderPlant>
          <HeaderSpace>Działka</HeaderSpace>
        </HeaderWrapper>
      </ImgAndHeaderWrapper>
      <BlueCircleImgWrapper>
        <BlueCircleImg src={ImgBlueCircle} alt="ImgBlueCircle" />
        <BlueCircleImg src={ImgBlueCircle} alt="ImgBlueCircle" />
        <BlueCircleImg src={ImgBlueCircle} alt="ImgBlueCircle" />
      </BlueCircleImgWrapper>
      <ImgTreeWrapper>
        <ImgTree src={treeImg} alt="treeImg" />
        <ImgTree src={plantInAVaseImg} alt="plantInAVaseImg" />
      </ImgTreeWrapper>
    </TargetTasksWrapper>
  );
};

export default TargetTasks;
