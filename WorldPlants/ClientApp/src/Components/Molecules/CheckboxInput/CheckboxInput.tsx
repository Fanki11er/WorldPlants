import { useField } from "formik";
import {
  CheckboxNotification,
  HeaderNotification,
  HiddenCheckbox,
  NotificationFormLabel,
} from "./CheckboxInput.styles";

interface Props {
  id: string;
  label: string;
}

const CheckboxInput = (props: Props) => {
  const { id, label } = props;
  const [field] = useField(props.id);

  return (
    <NotificationFormLabel>
      <HeaderNotification>Podlewanie</HeaderNotification>
      <CheckboxNotification $checked={`${field.value}`} />
      <HiddenCheckbox id={id} name={id} type="checkbox" />
    </NotificationFormLabel>
  );
};

export default CheckboxInput;
