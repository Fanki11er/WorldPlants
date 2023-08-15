import { Formik, FormikFormProps } from "formik";
import { ChangeSiteSettingsFormWrapper } from "./ChangeSiteSettingsForm.styles";
import { GetUserSiteSettingsDto } from "../../../Interfaces/GetUserSiteSettingsDto";
import SelectSunExposureForm from "../../Molecules/SelectSunExposureForm/SelectSunExposureForm";
import { apiEndpoints } from "../../../Api/endpoints";
import CheckboxInput from "../../Molecules/CheckboxInput/CheckboxInput";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { useParams } from "react-router-dom";
import { SITE_SETTINGS } from "../../../Constants/Constants";
import { EditUserSiteSettingsDto } from "../../../Interfaces/EditUserSiteSettingsDto";
import InputField from "../../Molecules/InputField/InputField";
import FormNumberField from "../../Molecules/FormNumberField/FormNumberField";

interface Props {
  actualValues: GetUserSiteSettingsDto;
}
const ChangeSiteSettingsForm = (props: Props & FormikFormProps) => {
  const { actualValues } = props;
  const { editUserSiteSettings } = apiEndpoints;
  const { getSunExposuresByLocation } = apiEndpoints;
  const { siteId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const c = useQueryClient();
  const { mutate, isSuccess, error } = useMutation({
    mutationFn: (values: EditUserSiteSettingsDto) => {
      return axiosPrivate.post(editUserSiteSettings(siteId!), values);
    },
  });

  return (
    <Formik
      initialValues={{
        name: actualValues.name,
        coldPeriodMinTemperature: actualValues.coldPeriodMinTemperature,
        coldPeriodMaxTemperature: actualValues.coldPeriodMaxTemperature,
        warmPeriodMinTemperature: actualValues.warmPeriodMinTemperature,
        warmPeriodMaxTemperature: actualValues.warmPeriodMaxTemperature,
        hasRoof: actualValues.hasRoof,
        sunExposureId: actualValues.sunExposureId,
      }}
      onSubmit={(values: EditUserSiteSettingsDto, { setSubmitting }) => {
        mutate(values, {
          onSuccess: () => {
            c.invalidateQueries(SITE_SETTINGS);
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <ChangeSiteSettingsFormWrapper>
          {isSuccess && <div>Sukces</div>}
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}

          <InputField name="name" label="Nazwa" placeholder="Nazwa" />
          <FormNumberField
            label={"Minimalna temperatura w okresie chłodnym"}
            name="coldPeriodMinTemperature"
            scale="C&ordm;"
          />

          <FormNumberField
            label={"Maksymalna temperatura w okresie chłodnym"}
            name="coldPeriodMaxTemperature"
            scale="C&ordm;"
          />

          <FormNumberField
            label={"Minimalna temperatura w okresie ciepłym"}
            name="warmPeriodMinTemperature"
            scale="C&ordm;"
          />

          <FormNumberField
            label={"Maksymalna temperatura w okresie ciepłym"}
            name="warmPeriodMaxTemperature"
            scale="C&ordm;"
          />

          <SelectSunExposureForm
            fieldName={"sunExposureId"}
            dataEndpoint={getSunExposuresByLocation(actualValues.location)}
            doNotResetFieldValue
          />
          {actualValues.canChangeHasRoof && (
            <CheckboxInput id={"hasRoof"} label={"Zadaszenie"} />
          )}

          {!isSubmitting && siteId && <button type="submit">Zapisz</button>}
        </ChangeSiteSettingsFormWrapper>
      )}
    </Formik>
  );
};

export default ChangeSiteSettingsForm;
