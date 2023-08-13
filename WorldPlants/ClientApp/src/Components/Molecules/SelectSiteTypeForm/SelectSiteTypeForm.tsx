import { useQuery } from "react-query";
import {
  FieldsWrapper,
  InfoHeader,
  SelectSiteTypeFormWrapper,
} from "./SelectSiteTypeForm.styles";
import { DEFAULT_SITES } from "../../../Constants/Constants";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { apiEndpoints } from "../../../Api/endpoints";
import { DefaultSiteDto } from "../../../Interfaces/DefaultSiteDto";
import RadioInputField from "../RadioInputField/RadioInputField";

interface Props {
  fieldName: string;
}

const SelectSiteTypeForm = (props: Props) => {
  const { getDefaultSites } = apiEndpoints;
  const { fieldName } = props;
  const axiosPrivate = useAxiosPrivate();
  const { error, data, isLoading } = useQuery<DefaultSiteDto[]>(
    DEFAULT_SITES,
    async () => {
      const result = await axiosPrivate.get(getDefaultSites);

      return result.data;
    }
  );

  const renderData = (data: DefaultSiteDto[]) => {
    return data.map((item) => {
      return (
        <RadioInputField
          key={item.id}
          name={fieldName}
          label={item.name}
          location={item.location}
          id={item.id}
        />
      );
    });
  };

  return (
    <SelectSiteTypeFormWrapper>
      <InfoHeader>Wybierz miejsce</InfoHeader>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      <FieldsWrapper>{data && renderData(data)}</FieldsWrapper>
    </SelectSiteTypeFormWrapper>
  );
};

export default SelectSiteTypeForm;
