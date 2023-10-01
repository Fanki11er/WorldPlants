import { Formik, FormikErrors } from "formik";
import {
  ButtonIcon,
  MoveButton,
  MovePlantFormWrapper,
  NotSelectedPlaces,
} from "./MovePlantForm.styles";
import { MovePlantInformationDto } from "../../../Interfaces/MovePlantInformationDto";
import RadioInputField from "../RadioInputField/RadioInputField";
import { DefaultSiteDto } from "../../../Interfaces/DefaultSiteDto";
import movePlantIcon from "../../../Assets/MovingPlants.svg";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "react-query";
import {
  MOVE_PLANT_INFORMATION,
  PLANT_HEADER_INFORMATION,
  SITE_PLANTS,
} from "../../../Constants/Constants";
import FormRequestError from "../FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import { MovePlantDto } from "../../../Interfaces/MovePlantDto";
import { FormSuccess } from "../../Atoms/FormSuccess/FormSuccess";

interface Props {
  movePlantInformation: MovePlantInformationDto;
}

interface FormValues {
  plantSiteId: number;
}

const MovePlantForm = (props: Props) => {
  const { movePlantInformation } = props;
  const { movePlant } = apiEndpoints;
  const axiosPrivate = useAxiosPrivate();
  const client = useQueryClient();
  const { isLoading, error, isSuccess, mutate } = useMutation({
    mutationFn: (movePlantData: MovePlantDto) => {
      return axiosPrivate.post(movePlant, movePlantData);
    },
  });
  const renderAvailableSites = (availableSites: DefaultSiteDto[]) => {
    return availableSites.map((site) => {
      return (
        <RadioInputField
          id={site.id}
          key={site.id}
          name={"plantSiteId"}
          location={site.location}
          label={site.name}
        />
      );
    });
  };
  return (
    <Formik
      initialValues={{ plantSiteId: movePlantInformation.currentSite.id || 0 }}
      onSubmit={(values: FormValues, { setFieldError }) => {
        const movePlantDto: MovePlantDto = {
          plantId: movePlantInformation.plantId,
          newPlantSiteId: values.plantSiteId,
        };

        mutate(movePlantDto, {
          onSuccess: () => {
            client.invalidateQueries([
              SITE_PLANTS,
              movePlantInformation.currentSite.id,
            ]);
            client.invalidateQueries([
              MOVE_PLANT_INFORMATION,
              movePlantInformation.plantId,
            ]);
            client.invalidateQueries([
              PLANT_HEADER_INFORMATION,
              movePlantInformation.plantId,
            ]);

            setFieldError("plantSiteId", "New place not selected");
          },
        });
      }}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};

        if (values.plantSiteId == movePlantInformation.currentSite.id) {
          errors.plantSiteId = "New place not selected";
        }
        return errors;
      }}
      validateOnMount
      validateOnChange
    >
      {({ errors }) => (
        <MovePlantFormWrapper>
          {isLoading && <LoadingIndicator />}
          {isSuccess && <FormSuccess>Przeniesiono</FormSuccess>}
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}
          <RadioInputField
            id={movePlantInformation.currentSite.id}
            name={"plantSiteId"}
            location={movePlantInformation.currentSite.location}
            label={movePlantInformation.currentSite.name}
          />

          <MoveButton
            type="submit"
            $isButtonActive={errors.plantSiteId ? false : true}
          >
            <ButtonIcon src={movePlantIcon} /> Przenieś
          </MoveButton>

          <NotSelectedPlaces>
            {renderAvailableSites(movePlantInformation.availableSites)}
          </NotSelectedPlaces>
        </MovePlantFormWrapper>
      )}
    </Formik>
  );
};

export default MovePlantForm;
