import { Formik, FormikErrors, FormikHelpers } from "formik";
import { useState } from "react";
import {
  AddUserSiteMultiStepFormWrapper,
  MultiStepForm,
} from "./AddUserSiteMultiStepForm.styles";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { apiEndpoints } from "../../../Api/endpoints";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../Router/paths";
import { AddUserSiteValues } from "../../../Interfaces/AddUserSiteValues";
import FormControls from "../../Molecules/FormControls/FormControls";
import SelectSiteTypeForm from "../../Molecules/SelectSiteTypeForm/SelectSiteTypeForm";
import SelectSunExposureForm from "../../Molecules/SelectSunExposureForm/SelectSunExposureForm";
import AddSiteMultiStepFormSummary from "../../Molecules/AddSiteMultiStepFormSummary/AddSiteMultistepFormSummary";

const STEPS_NUMBER = 3;

const AddUserSiteMultiStepForm = () => {
  const { authorized, userSite } = paths;
  const { addUserSite } = apiEndpoints;
  const [formStep, setFormStep] = useState(1);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (values: AddUserSiteValues) => {
      const result = await axiosPrivate.post(addUserSite, values);
      return result.data;
    },
  });

  const moveForward = () => {
    if (formStep < STEPS_NUMBER) {
      setFormStep((currentStep) => currentStep + 1);
    }
  };

  const moveBack = () => {
    if (formStep > 1) {
      setFormStep((currentStep) => currentStep - 1);
    }
  };

  return (
    <AddUserSiteMultiStepFormWrapper>
      <Formik
        initialValues={{
          name: "",
          defaultSiteId: "",
          sunExposureId: "",
          hasRoof: "",
        }}
        onSubmit={(
          values: AddUserSiteValues,
          { setSubmitting, resetForm }: FormikHelpers<AddUserSiteValues>
        ) => {
          mutate(values, {
            onSuccess: (data) => {
              resetForm();
              navigate(`${authorized}/${userSite}/${data}`);
            },
          });
          setSubmitting(false);
        }}
        validate={(values) => {
          const error: FormikErrors<AddUserSiteValues> = {};
          if (formStep === 1 && !values.defaultSiteId) {
            error.defaultSiteId = "Należy wybrać rodzaj miejsca";
          }

          if (formStep === 2 && !values.sunExposureId) {
            error.sunExposureId = "Należy wybrać poziom naświetlenia";
          }

          if (formStep !== 3 || !values.name) {
            error.name = "Należy podać nazwę dla miejsca";
          }

          return error;
        }}
        validateOnMount
      >
        {({ errors }) => (
          <MultiStepForm>
            {formStep === 1 && (
              <SelectSiteTypeForm fieldName={"defaultSiteId"} />
            )}
            {formStep === 2 && (
              <SelectSunExposureForm fieldName={"sunExposureId"} />
            )}

            {formStep === 3 && (
              <AddSiteMultiStepFormSummary
                textfieldName={"name"}
                checkboxFieldName={"hasRoof"}
              />
            )}

            <FormControls
              moveForward={moveForward}
              moveBack={moveBack}
              disabledForward={
                !!errors.defaultSiteId ||
                !!errors.sunExposureId ||
                formStep === 3
              }
              disabledBack={formStep === 1}
              disableSubmit={
                !!errors.defaultSiteId ||
                !!errors.sunExposureId ||
                !!errors.name
              }
            />
          </MultiStepForm>
        )}
      </Formik>
    </AddUserSiteMultiStepFormWrapper>
  );
};

export default AddUserSiteMultiStepForm;
