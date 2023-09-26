import { Formik, FormikHelpers } from "formik";
import { FilterFormWrapper } from "./FilterForm.styles";
import { StandardTaskTypeFilter } from "../../../Interfaces/PlantActiveTask";
import SelectFormField from "../SelectFormField/SelectFormField";
import { SelectFieldOptions } from "../../../Interfaces/SelectFieldOption";
import AutoSubmit from "../AutoSubmit/AutoSubmit";

interface FormValues {
  filter: StandardTaskTypeFilter;
}

interface Props {
  setterFunction: (value: StandardTaskTypeFilter) => void;
  initialFilterValue: StandardTaskTypeFilter;
}

const filterByActionValues: SelectFieldOptions<StandardTaskTypeFilter>[] = [
  {
    value: "",
    label: "Wszystkie",
  },
  {
    value: "Water",
    label: "Podlewanie",
  },
  {
    value: "Fertilize",
    label: "Nawożenie",
  },
  {
    value: "Cut",
    label: "Przycinanie",
  },
  {
    value: "Replant",
    label: "Przesadzanie",
  },
  {
    value: "Mist",
    label: "Zwilżanie",
  },
  {
    value: "Custom",
    label: "Inne",
  },
];

const FilterForm = (props: Props) => {
  const { setterFunction, initialFilterValue } = props;

  return (
    <Formik
      initialValues={{
        filter: initialFilterValue,
      }}
      onSubmit={(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        console.log(values, "Submit");
        setterFunction(values.filter);
        setSubmitting(false);
      }}
    >
      <FilterFormWrapper>
        <SelectFormField
          name={"filter"}
          isError={false}
          placeholder={"Filtruj"}
          label="Filtruj"
          values={filterByActionValues}
        />
        <AutoSubmit fieldName={"filter"} />
      </FilterFormWrapper>
    </Formik>
  );
};
export default FilterForm;
