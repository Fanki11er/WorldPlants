import { useNavigate, useParams } from "react-router-dom";
import { apiEndpoints } from "../../../Api/endpoints";
import { paths } from "../../../Router/paths";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation } from "react-query";
import { Formik, FormikErrors } from "formik";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import InputField from "../InputField/InputField";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import {
  DeleteFormInstruction,
  DeleteFormWrapper,
} from "../../Atoms/DeleteFormWrapper/DeleteFormWrapper.styles";

interface Props {
  plantName: string;
  userSiteId: string;
}

interface FormValues {
  name: string;
}

const DeletePlantForm = (props: Props) => {
  const { plantName, userSiteId } = props;
  const { authorized, userSite } = paths;
  const { plantId } = useParams();
  const { deletePlant } = apiEndpoints;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { error, isLoading, mutate } = useMutation(() => {
    return axiosPrivate.delete(deletePlant(plantId));
  });

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};
        if (values.name !== plantName) {
          errors.name = "Należy podac nazwę rośliny do usunięcia";
        }
        return errors;
      }}
      onSubmit={(values: FormValues, { setSubmitting, resetForm }) => {
        if (values.name === plantName) {
          mutate(undefined, {
            onSuccess: () => {
              resetForm();
              navigate(`${authorized}/${userSite}/${userSiteId}`, {
                replace: true,
              });
            },
          });
        }

        setSubmitting(false);
      }}
      validateOnMount
    >
      {({ errors }) => (
        <DeleteFormWrapper>
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}

          <InputField
            label="Nazwa rośliny"
            name="name"
            placeholder="Nazwa rosliny"
          />
          <DeleteFormInstruction>
            Wpisz nazwę tej rośliny, aby móc ją usunąć{" "}
          </DeleteFormInstruction>

          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <ActionButton disabled={!!errors.name} type="submit">
              Zapisz
            </ActionButton>
          )}
        </DeleteFormWrapper>
      )}
    </Formik>
  );
};

export default DeletePlantForm;
