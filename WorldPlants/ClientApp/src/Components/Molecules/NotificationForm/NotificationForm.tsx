import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { NotificationSettings } from "../../../Interfaces/NotificationsSettings";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import {
  HeaderNotificationEmailAndSms,
  NotificationWrapper,
} from "../../Atoms/NotificationWrapper/NotificationWrapper";
import { NotificationFormWrapper } from "./NotificationForm.styles";
import { Formik } from "formik";
import { NOTIFICATION_SETTINGS } from "../../../Constants/Constants";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";
import CheckboxInput from "../CheckboxInput/CheckboxInput";

interface Props {
  actualValues: NotificationSettings;
  submitPath: string;
  header: string;
}

const NotificationForm = (props: Props) => {
  const { actualValues, header, submitPath } = props;
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: (dto: NotificationSettings) => {
      return axiosPrivate.post(submitPath, dto);
    },
  });
  return (
    <Formik
      initialValues={
        {
          waterPlantsReminder: actualValues.waterPlantsReminder,
          fertilizePlantsReminder: actualValues.fertilizePlantsReminder,
          cutPlantsReminder: actualValues.cutPlantsReminder,
          replantPlantsReminder: actualValues.replantPlantsReminder,
          mistPlantsReminder: actualValues.mistPlantsReminder,
          customTasksReminder: actualValues.customTasksReminder,
        } as NotificationSettings
      }
      onSubmit={(values, { setSubmitting }) => {
        mutate(values, {
          onSuccess: () => {
            client.invalidateQueries(NOTIFICATION_SETTINGS);
          },
        });
        setSubmitting(false);
      }}
    >
      <NotificationFormWrapper>
        <HeaderNotificationEmailAndSms> {header}</HeaderNotificationEmailAndSms>

        <NotificationWrapper>
          <CheckboxInput id={"waterPlantsReminder"} label="Podlewanie" />
          <CheckboxInput id={"fertilizePlantsReminder"} label="Nawożenie" />
          <CheckboxInput id={"cutPlantsReminder"} label="Przycinanie" />
          <CheckboxInput id={"replantPlantsReminder"} label="Przesadzanie" />
          <CheckboxInput id={"mistPlantsReminder"} label="Zraszanie" />
          <CheckboxInput id={"customTasksReminder"} label="Własne" />
        </NotificationWrapper>

        <ActionButton type={"submit"}>Zapisz</ActionButton>
        {isSuccess && <FormSuccess>Zapisano zmiany</FormSuccess>}
      </NotificationFormWrapper>
    </Formik>
  );
};

export default NotificationForm;
