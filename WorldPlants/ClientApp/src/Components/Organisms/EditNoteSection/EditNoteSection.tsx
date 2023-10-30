import { useQueryClient } from "react-query";
import PlantNoteForm from "../../Molecules/PlantNoteForm/PlantNoteForm";
import {
  EditNoteSectionButtonsWrapper,
  EditNoteSectionFormWrapper,
} from "./EditNoteSection.styles";
import useQueryKey from "../../../Hooks/useQueryKey";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlantNoteDto } from "../../../Interfaces/PlantNoteDto";
import { apiEndpoints } from "../../../Api/endpoints";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { GenerateQRButton } from "../../Atoms/Buttons/Buttons";
import GoToTop from "../../Molecules/GoToTop/GoToTop";

const EditNoteSection = () => {
  const { editNote } = apiEndpoints;
  const { plantId, noteId } = useParams();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { plantNotesQueryKey } = useQueryKey();
  const data = client.getQueryData<PlantNoteDto[]>(plantNotesQueryKey(plantId));
  const [selectedNote, setSelectedNote] = useState<PlantNoteDto | undefined>(
    undefined
  );

  useEffect(() => {
    if (data && data.length) {
      const result = data.find((note) => {
        return note.id.toString() === noteId;
      });
      setSelectedNote(result);
    }
  }, [data, noteId]);

  return (
    <SettingsSectionWrapper>
      <GoToTop />
      {selectedNote && (
        <EditNoteSectionFormWrapper>
          <PlantNoteForm
            id={"noteEditForm"}
            currentValues={{
              imageUrl: selectedNote.imageUrl || "",
              title: selectedNote.title,
              note: selectedNote.note,
            }}
            submitEndpoint={() => editNote(selectedNote.id)}
            successIndicatorText="Pomyślnie edytowano"
          />
          <EditNoteSectionButtonsWrapper>
            <GenerateQRButton type="submit" form="noteEditForm">
              Edytuj
            </GenerateQRButton>
            <GenerateQRButton onClick={() => navigate(-1)}>
              Powrót
            </GenerateQRButton>
          </EditNoteSectionButtonsWrapper>
        </EditNoteSectionFormWrapper>
      )}
    </SettingsSectionWrapper>
  );
};

export default EditNoteSection;
