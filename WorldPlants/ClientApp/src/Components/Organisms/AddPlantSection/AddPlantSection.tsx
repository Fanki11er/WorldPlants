import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddPlantSectionWrapper,
  NextAndReturnButtonWrapper,
} from "./AddPlantSection.styles";
import { useQuery } from "react-query";
import { PLantsDetailsDto } from "../../../Interfaces/PlantDetailsDto";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { apiEndpoints } from "../../../Api/endpoints";
import { PLANT_DETAILS } from "../../../Constants/Constants";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import PlantDetails from "../../Molecules/PlantDetails/PlantDetails";
import AddPlantForm from "../../Molecules/AddPlantForm/AddPlantForm";
import { ActionButton } from "../../Atoms/Buttons/Buttons";

const AddPlantSection = () => {
  const { getPlantDetails } = apiEndpoints;
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { error, isLoading, data, isFetching } = useQuery<PLantsDetailsDto>(
    [PLANT_DETAILS, detailsId],
    async () => {
      const result = await axiosPrivate.get(getPlantDetails(detailsId));
      return result.data;
    },
    {
      enabled: !!detailsId,
    }
  );
  const [step, setStep] = useState(1);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const toggleIsFormSubmitting = async (isSubmitting: boolean) => {
    setIsFormSubmitting(isSubmitting);
  };

  const stepForward = () => {
    if (step < 2) {
      setStep((step) => (step += 1));
    }
  };
  const stepBackward = () => {
    if (step > 1) {
      setStep((step) => (step -= 1));
    }
  };

  return (
    <AddPlantSectionWrapper>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}
      {data && step === 1 ? <PlantDetails plantDetails={data} /> : null}
      {step === 2 ? (
        <AddPlantForm
          currentImage={data?.defaultImage || ""}
          currentName={data?.commonName || ""}
          externalId={data?.id || undefined}
        />
      ) : null}
      <NextAndReturnButtonWrapper>
        {!isLoading && (
          <ActionButton
            onClick={() => {
              if (step === 2) {
                return stepBackward();
              }
              return navigate(-1);
            }}
          >
            Powrót
          </ActionButton>
        )}

        {step === 2 && !isFormSubmitting && (
          <ActionButton type="submit" form="AddPlantForm">
            Zapisz
          </ActionButton>
        )}

        {step === 1 && !isLoading && (
          <ActionButton onClick={stepForward}>Dalej</ActionButton>
        )}
      </NextAndReturnButtonWrapper>
    </AddPlantSectionWrapper>
  );
};

export default AddPlantSection;
