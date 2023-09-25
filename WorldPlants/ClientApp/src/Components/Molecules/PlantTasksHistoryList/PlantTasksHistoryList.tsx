import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import {
  PlantTasksHistoryListItem,
  PlantTasksHistoryListItemCircle,
  PlantTasksHistoryListItemInformation,
  PlantTasksHistoryListItemInformationWrapper,
  PlantTasksHistoryListWrapper,
} from "./PlantTasksHistoryList.styles";
import noIcon from "../../../assets/NoIcon.svg";
import { PlantTasksHistoryItem } from "../../../Interfaces/PlantTasksHistoryItem";
import { translateActionType } from "../../../Utils/Utils";
import {
  StandardTaskTypeEnum,
  StandardTaskTypeFilter,
} from "../../../Interfaces/PlantActiveTask";
import waterIcon from "../../../Assets/WateringsThree.svg";
import fertilizeIcon from "../../../Assets/Fertilizer.svg";
import cutIcon from "../../../Assets/Pruning.svg";
import { useCallback } from "react";

interface Props {
  tasksHistory: PlantTasksHistoryItem[];
  filter: StandardTaskTypeFilter;
}
const PlantTasksHistoryList = (props: Props) => {
  const { tasksHistory, filter } = props;

  const translateActionTypeToIcon = (actionType: StandardTaskTypeEnum) => {
    switch (StandardTaskTypeEnum[actionType] as unknown as number) {
      case StandardTaskTypeEnum.Water: {
        return waterIcon;
      }
      case StandardTaskTypeEnum.Fertilize: {
        return fertilizeIcon;
      }
      case StandardTaskTypeEnum.Cut: {
        return cutIcon;
      }
      case StandardTaskTypeEnum.Mist: {
        return "";
      }
      case StandardTaskTypeEnum.Replant: {
        return "";
      }
      default: {
        return "";
      }
    }
  };

  const filterByTaskType = useCallback(
    (
      taskType: StandardTaskTypeFilter,
      tasksHistory: PlantTasksHistoryItem[]
    ) => {
      if (taskType === "") {
        return tasksHistory;
      }
      return tasksHistory.filter((task) => {
        return task.taskType === taskType;
      });
    },
    []
  );

  const renderListItems = (tasksHistory: PlantTasksHistoryItem[]) => {
    return filterByTaskType(filter, tasksHistory).map((task) => {
      return (
        <PlantTasksHistoryListItem key={task.id}>
          <PlantTasksHistoryListItemCircle>
            <PlantInfoIcon
              src={
                translateActionTypeToIcon(
                  task.taskType as unknown as StandardTaskTypeEnum
                ) || noIcon
              }
            />
          </PlantTasksHistoryListItemCircle>
          <PlantTasksHistoryListItemInformationWrapper>
            <PlantTasksHistoryListItemInformation>
              {translateActionType(
                task.taskType as unknown as StandardTaskTypeEnum
              )}
            </PlantTasksHistoryListItemInformation>
            <PlantTasksHistoryListItemInformation>
              {task.userName}
            </PlantTasksHistoryListItemInformation>
            <PlantTasksHistoryListItemInformation>
              {task.executionDate}
            </PlantTasksHistoryListItemInformation>
          </PlantTasksHistoryListItemInformationWrapper>
        </PlantTasksHistoryListItem>
      );
    });
  };

  return (
    <PlantTasksHistoryListWrapper>
      {renderListItems(tasksHistory)}
    </PlantTasksHistoryListWrapper>
  );
};

export default PlantTasksHistoryList;
