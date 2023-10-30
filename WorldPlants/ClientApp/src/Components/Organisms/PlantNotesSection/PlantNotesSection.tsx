import { useQuery } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { StyledButton } from "../../Molecules/PlantTasksList/PlantTasksList.styles";
import useQueryKey from "../../../Hooks/useQueryKey";
import { useParams } from "react-router-dom";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import { LoadingIndicator } from "../../Atoms/LoadingIndicator/LoadingIndicator.styles";

import NoListContentInfo from "../../Molecules/NoListContentInfo/NoListContentInfo";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { PlantNoteDto } from "../../../Interfaces/PlantNoteDto";
import PlantNoteForm from "../../Molecules/PlantNoteForm/PlantNoteForm";
import PlantNotesList from "../../Molecules/PlantNotesList/PlantNotesList";
import { ActionButton, GenerateQRButton } from "../../Atoms/Buttons/Buttons";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const PlantNotesSection = () => {
  const { addNote, getNotes } = apiEndpoints;
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { plantNotesQueryKey } = useQueryKey();
  const { isLoading, data, error } = useQuery<PlantNoteDto[]>(
    plantNotesQueryKey(plantId),
    async () => {
      const result = await axiosPrivate.get(getNotes(plantId));
      return result.data;
    },
    {
      enabled: !!plantId,
    }
  );

  return (
    <SettingsSectionWrapper>
       <GoToTop />
      <PlantNoteForm
        id={"AddNoteForm"}
        currentValues={null}
        submitEndpoint={addNote}
        successIndicatorText="Notatka utworzona"
      />
      <GenerateQRButton type="submit" form="AddNoteForm">
        Zapisz
      </GenerateQRButton>
      {isLoading && <LoadingIndicator />}
      {error ? (
        <FormRequestError errorValues={getErrorMessages(error)} />
      ) : null}

      {data && data.length > 0 && <PlantNotesList notes={data} />}
      {data && data.length === 0 && (
        <NoListContentInfo
          informationHeaderText="Brak notatek"
          informationText="Tu będą widoczne dodane notatki"
        />
      )}
    </SettingsSectionWrapper>
  );
};
export default PlantNotesSection;
