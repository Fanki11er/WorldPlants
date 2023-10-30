import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import PlantScheduleTip from "../PlantScheduleTip/PlantScheduleTip";
import PlantStandardTaskScheduleForm from "../PlantStandardTaskScheduleForm/PlantStandardTaskScheduleForm";
import {
  PlantScheduleConcreteTypeHeader,
  PlantScheduleConcreteTypeHeaderWrapper,
  PlantScheduleConcreteTypeWrapper,
} from "./PlantScheduleConcreteType.styles";

interface Props {
  description: string;
  iconSrc: string;
  iconAlt: string;
  taskId: number;
  tipData?: string;
}

const PlantScheduleConcreteType = (props: Props) => {
  const { iconSrc, iconAlt, tipData, taskId, description } = props;
  return (
    <PlantScheduleConcreteTypeWrapper>
      <PlantScheduleConcreteTypeHeaderWrapper>
        <PlantInfoIcon src={iconSrc} alt={iconAlt} />
        <PlantScheduleConcreteTypeHeader>
          {description}
        </PlantScheduleConcreteTypeHeader>
      </PlantScheduleConcreteTypeHeaderWrapper>
      <PlantScheduleTip tipData={tipData ? tipData : ""} />
      <PlantStandardTaskScheduleForm taskId={taskId} />
    </PlantScheduleConcreteTypeWrapper>
  );
};

export default PlantScheduleConcreteType;
