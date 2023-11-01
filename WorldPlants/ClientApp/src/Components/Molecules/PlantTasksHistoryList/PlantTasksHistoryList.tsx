import { PlantInfoIcon } from "../../Atoms/PlantInfoIcon/PlantInfoIcon.styles";
import {
  PlantTasksHistoryListItem,
  PlantTasksHistoryListItemCircle,
  PlantTasksHistoryListItemInformation,
  PlantTasksHistoryListItemInformationWrapper,
  PlantTasksHistoryListWrapper,
} from "./PlantTasksHistoryList.styles";
import { PlantTasksHistoryItem } from "../../../Interfaces/PlantTasksHistoryItem";

import {
  StandardTaskType,
  StandardTaskTypeEnum,
  StandardTaskTypeFilter,
} from "../../../Interfaces/PlantActiveTask";
import waterIcon from "../../../Assets/WateringsThree.svg";
import fertilizeIcon from "../../../Assets/Fertilizer.svg";
import cutIcon from "../../../Assets/Pruning.svg";
import { useCallback } from "react";
import mist from "../../../Assets/Wetting2.svg";
import replant from "../../../Assets/MovingPlants.svg";
import noIcon from "../../../Assets/NoIcon.svg";
import customAction from "../../../Assets/CustomActionType2.svg";

interface Props {
  tasksHistory: PlantTasksHistoryItem[];
  filter: StandardTaskTypeFilter;
}
const PlantTasksHistoryList = (props: Props) => {
  const { tasksHistory, filter } = props;
  const translateActionTypeToIcon = (actionType: StandardTaskType) => {
    switch (actionType) {
      case "Water": {
        return waterIcon;
      }
      case "Fertilize": {
        return fertilizeIcon;
      }
      case "Cut": {
        return cutIcon;
      }
      case "Mist": {
        return mist;
      }
      case "Replant": {
        return replant;
      }
      case "Custom": {
        return customAction;
      }
      default: {
        return noIcon;
      }
    }
  };
  console.log(tasksHistory);
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
                translateActionTypeToIcon(task.taskType as StandardTaskType) ||
                noIcon
              }
            />
          </PlantTasksHistoryListItemCircle>
          <PlantTasksHistoryListItemInformationWrapper>
            <PlantTasksHistoryListItemInformation>
              {task.taskName}
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
