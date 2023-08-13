import {
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

const TargetTasks = () => {
  return (
    <TargetTasksWrapper>
      <ImgAndHeaderWrapper>
        <ImgPlant src={taskPlantImg} alt="taskPlantImg"></ImgPlant>
        <HeaderWrapper>
          <HeaderPlant>Tulipan</HeaderPlant>
          <HeaderSpace>Działka</HeaderSpace>
        </HeaderWrapper>
      </ImgAndHeaderWrapper>
      <ImgTreeWrapper>
        <ImgTree src={treeImg} alt="treeImg" />
      </ImgTreeWrapper>
    </TargetTasksWrapper>
  );
};

export default TargetTasks;
