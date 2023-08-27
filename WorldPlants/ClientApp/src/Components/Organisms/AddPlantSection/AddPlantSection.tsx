import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddPlantSectionWrapper } from "./AddPlantSection.styles";
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

const AddPlantSection = () => {
  const { getPlantDetails } = apiEndpoints;
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { error, isLoading, data } = useQuery<PLantsDetailsDto>(
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
      {data && step === 2 ? (
        <AddPlantForm
          currentImage={data.defaultImage || ""}
          currentName={data.commonName || ""}
        />
      ) : null}
      {step === 1 && !isLoading && <button onClick={stepForward}>Dalej</button>}
      {!isLoading && (
        <button
          onClick={() => {
            if (step === 2) {
              return stepBackward();
            }
            return navigate(-1);
          }}
        >
          Powrót
        </button>
      )}
    </AddPlantSectionWrapper>
  );
};

export default AddPlantSection;
