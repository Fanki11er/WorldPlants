import { PlantScheduleTipWrapper } from "./PlantScheduleTip.styles";

interface Props {
  tipData: string;
}

const PlantScheduleTip = (props: Props) => {
  const { tipData } = props;
  return <PlantScheduleTipWrapper>{tipData}</PlantScheduleTipWrapper>;
};

export default PlantScheduleTip;
