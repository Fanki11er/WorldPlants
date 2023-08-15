import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation } from "react-query";
import { Formik, FormikErrors } from "formik";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { paths } from "../../../Router/paths";
import { apiEndpoints } from "../../../Api/endpoints";
import { DeleteUserSiteConfirmation } from "../../../Interfaces/DeleteUserSiteConfirmation";
import InputField from "../../Molecules/InputField/InputField";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import {
  DeleteFormInstruction,
  DeleteFormWrapper,
} from "../../Atoms/DeleteFormWrapper/DeleteFormWrapper.styles";

interface Props {
  siteName: string;
  plantsCount: number;
}

const DeleteSiteForm = (props: Props) => {
  const { authorized, userSites } = paths;
  const { siteId } = useParams();
  const { deleteUserSite } = apiEndpoints;
  const { siteName, plantsCount } = props;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { error, isLoading, mutate } = useMutation(() => {
    return axiosPrivate.delete(deleteUserSite(siteId ? siteId : ""));
  });

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validate={(values) => {
        const errors: FormikErrors<DeleteUserSiteConfirmation> = {};
        if (values.name !== siteName) {
          errors.name = "Należy podac nazwę konta do usunięcia";
        }
        return errors;
      }}
      onSubmit={(
        values: DeleteUserSiteConfirmation,
        { setSubmitting, resetForm }
      ) => {
        if (values.name === siteName) {
          mutate(undefined, {
            onSuccess: () => {
              resetForm();
              navigate(`${authorized}/${userSites}`, { replace: true });
            },
          });
        }

        setSubmitting(false);
      }}
    >
      {({ errors }) => (
        <DeleteFormWrapper>
          <div>{`UWAGA: Usunięcie tego miejsca spowoduje usunięcie ${plantsCount} roślin`}</div>
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}

          <InputField
            label="Nazwa miejsca"
            name="name"
            placeholder="Nazwa miejsca"
          />
          <DeleteFormInstruction>
            Wpisz nazwę tego miejsca aby móc je usunąć{" "}
          </DeleteFormInstruction>

          {isLoading ? (
            <div>Loading</div>
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

export default DeleteSiteForm;
