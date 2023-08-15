import { useFormikContext } from "formik";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import {
  FieldsWrapper,
  InfoHeader,
  SelectSunExposureFormWrapper,
} from "./SelectSunExposureForm.styles";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { AddUserSiteValues } from "../../../Interfaces/AddUserSiteValues";
import { useEffect } from "react";
import { SUN_EXPOSURES } from "../../../Constants/Constants";
import { SunExposureDto } from "../../../Interfaces/SunExposureDto";
import SunExposuresRadioField from "../SunExposuresRadioField/SunExposuresRadioField";

interface Props {
  fieldName: string;
  dataEndpoint: string;
  doNotResetFieldValue?: boolean;
}

const SelectSunExposureForm = (props: Props) => {
  const { fieldName, dataEndpoint, doNotResetFieldValue } = props;
  const { getDefaultSunExposures } = apiEndpoints;
  const { values, setFieldValue, validateForm } =
    useFormikContext<AddUserSiteValues>();
  const axiosPrivate = useAxiosPrivate();
  const { error, data, isLoading } = useQuery<SunExposureDto[]>(
    SUN_EXPOSURES,
    async () => {
      const result = await axiosPrivate.get(dataEndpoint);
      return result.data;
    }
  );

  const resetFieldValue = async () => {
    if (values.sunExposureId && data) {
      const notExists = data.filter((item) => {
        return item.id == values.sunExposureId;
      });
      if (!notExists.length) {
        await setFieldValue(fieldName, 0);
      }
    }
    validateForm();
  };

  useEffect(() => {
    !doNotResetFieldValue && resetFieldValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const renderData = (data: SunExposureDto[]) => {
    return data.map((item) => {
      return (
        <SunExposuresRadioField
          key={item.id}
          id={item.id}
          name={fieldName}
          label={item.name}
          sunScale={item.sunScale}
          description={item.description}
        />
      );
    });
  };
  return (
    <SelectSunExposureFormWrapper>
      <InfoHeader>Wybierz poziom nasłonecznienia</InfoHeader>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      <FieldsWrapper>{data && renderData(data)}</FieldsWrapper>
    </SelectSunExposureFormWrapper>
  );
};

export default SelectSunExposureForm;
