import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NextAndReturnButtonWrapper } from "./AddPlantSection.styles";
import { apiEndpoints } from "../../../Api/endpoints";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";
import PlantDetails from "../../Molecules/PlantDetails/PlantDetails";
import AddPlantForm from "../../Molecules/AddPlantForm/AddPlantForm";
import { ActionButton } from "../../Atoms/Buttons/Buttons";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import usePlantDetails from "../../../Hooks/usePlantDetails";

const AddPlantSection = () => {
  const { addPlant } = apiEndpoints;
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const { plantDetails, detailsError, areDetailsLoading } = usePlantDetails(
    detailsId ? Number(detailsId) : undefined
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
    <SettingsSectionWrapper>
      {areDetailsLoading && <LoadingIndicator />}
      {detailsError ? (
        <FormRequestError errorValues={getErrorMessages(detailsError)} />
      ) : null}
      {plantDetails && step === 1 ? (
        <PlantDetails plantDetails={plantDetails} />
      ) : null}

      {step === 2 ? (
        <AddPlantForm
          currentSettings={{
            name: plantDetails?.commonName,
            imageUrl: plantDetails?.defaultImage,
            externalId: plantDetails?.id,
          }}
          submitEndpoint={addPlant}
        />
      ) : null}
      <NextAndReturnButtonWrapper>
        {!areDetailsLoading && (
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

        {!areDetailsLoading && (
          <ActionButton type="submit" form="AddPlantForm">
            Zapisz
          </ActionButton>
        )}

        {step === 1 && !areDetailsLoading && (
          <ActionButton onClick={stepForward}>Dalej</ActionButton>
        )}
      </NextAndReturnButtonWrapper>
    </SettingsSectionWrapper>
  );
};

export default AddPlantSection;
