import { Formik, FormikErrors } from "formik";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation } from "react-query";
import useAuth from "../../../Hooks/useAuth";
import { DeleteAccountConfirmation } from "../../../Interfaces/DeleteAccountConfirmation";
import DeleteAccountForm from "../DeleteAccountForm/DeleteAccountForm";

interface Props {
  submitPath: string;
  toPath: string;
  accountName: string;
  logoutUser: boolean;
}

const DeleteUserAccountFormFormik = (props: Props) => {
  const { submitPath, toPath, accountName, logoutUser } = props;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { logout } = useAuth();

  const { error, isLoading, mutate } = useMutation(() => {
    return axiosPrivate.delete(submitPath);
  });

  return (
    <Formik
      initialValues={
        {
          name: "",
        } as DeleteAccountConfirmation
      }
      validate={(values) => {
        const errors: FormikErrors<DeleteAccountConfirmation> = {};
        if (values.name !== accountName) {
          errors.name = "Należy podac nazwę konta do usunięcia";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values.name === accountName) {
          mutate(undefined, {
            onSuccess: () => {
              resetForm();
              navigate(toPath, { replace: true });
              if (logoutUser) {
                logout();
              }
            },
          });
        }

        setSubmitting(false);
      }}
    >
      {({ errors }) => (
        <DeleteAccountForm
          isLoading={isLoading}
          error={error}
          confirmed={!!errors.name}
        />
      )}
    </Formik>
  );
};

export default DeleteUserAccountFormFormik;
