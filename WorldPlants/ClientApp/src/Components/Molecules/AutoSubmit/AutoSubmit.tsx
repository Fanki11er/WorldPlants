import { useFormikContext } from "formik";
import { useEffect } from "react";

interface Props {
  fieldName: string;
}
const AutoSubmit = (props: Props) => {
  const { fieldName } = props;
  const { values, submitForm, getFieldMeta } = useFormikContext();

  useEffect(() => {
    const meta = getFieldMeta(fieldName);

    if (meta.touched || meta.value !== "") {
      submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return null;
};

export default AutoSubmit;
