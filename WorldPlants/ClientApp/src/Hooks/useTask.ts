import { useMutation, useQueryClient } from "react-query";
import { apiEndpoints } from "../Api/endpoints";
import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import {
  ALL_PLANT_TASKS,
  INCOMING_TASKS,
  STANDARD_PLANT_TASKS,
  TASKS_HISTORY,
  TODAY_TASKS,
} from "../Constants/Constants";
import { TaskBasicInformation } from "../Interfaces/TaskBasicInformation";
import useQueryKey from "./useQueryKey";

interface Action {
  taskId: string;
  endpoint: (taskId: string) => string;
}

interface ActionErrorStatus {
  taskId: string;
  error: unknown;
}

const useTask = (plantId: string | undefined) => {
  const { snoozeTask, skipTask, executeTask } = apiEndpoints;
  const [actionInProgress, setActionInProgress] = useState("");
  const [actionError, setActionError] = useState<ActionErrorStatus | null>(
    null
  );
  const axiosPrivate = useAxiosPrivate();
  const [actionSuccess, setActionSuccess] = useState("");
  const client = useQueryClient();
  const {
    standardPlantTasksQueryKey,
    allPlantTasksQueryKey,
    tasksHistoryQueryKey,
    todayTasksQueryKey,
    incomingTasksQueryKey,
  } = useQueryKey();
  const { mutate: executeTaskMutation } = useMutation({
    mutationFn: async (action: Action) => {
      setActionError(null);
      setActionSuccess("");
      setActionInProgress(action.taskId);
      const result = await axiosPrivate.post(action.endpoint(action.taskId));
      return result.data;
    },

    onSuccess: async (data: TaskBasicInformation | undefined) => {
      client.invalidateQueries(standardPlantTasksQueryKey(plantId));
      client.invalidateQueries(allPlantTasksQueryKey());
      client.invalidateQueries(tasksHistoryQueryKey(plantId));
      client.invalidateQueries(todayTasksQueryKey());
      client.invalidateQueries(incomingTasksQueryKey());

      setActionSuccess(data?.id || "");
    },

    onError: async (error, action) => {
      setActionError({ taskId: action.taskId, error });
    },

    onSettled: () => {
      setActionInProgress("");
    },
  });

  return {
    snoozeTask,
    skipTask,
    executeTask,
    executeTaskMutation,
    actionInProgress,
    actionError,
    actionSuccess,
  };
};

export default useTask;
