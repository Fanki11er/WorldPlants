import { Formik, FormikErrors } from "formik";
import { AddPlantSearchFormWrapper } from "./AddPlantSearchForm.styles";
import useSearchPhrase from "../../../Hooks/useSearchPhrase";
import InputField from "../InputField/InputField";

interface Props {
  isLoading: boolean;
}

interface SearchFormValues {
  plantName: string;
}

const AddPlantSearchForm = (props: Props) => {
  const { isLoading } = props;
  const { searchPhrase, handleSetSearchPhrase } = useSearchPhrase();
  return (
    <Formik
      initialValues={{
        plantName: searchPhrase,
      }}
      onSubmit={(values: SearchFormValues, { setSubmitting }) => {
        handleSetSearchPhrase(values.plantName);
        setSubmitting(false);
      }}
      validate={(values) => {
        const errors: FormikErrors<SearchFormValues> = {};
        if (values.plantName === "") {
          errors.plantName = "Pole nie może być puste";
        }
        return errors;
      }}
    >
      <AddPlantSearchFormWrapper>
        <InputField
          name="plantName"
          label="Wpisz nazwę rośliny"
          placeholder="Nazwa rośliny"
        />
        {!isLoading && <button type="submit">Wyszukaj</button>}
      </AddPlantSearchFormWrapper>
    </Formik>
  );
};

export default AddPlantSearchForm;
