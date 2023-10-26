import { useQueryClient } from "react-query";
import PlantNoteForm from "../../Molecules/PlantNoteForm/PlantNoteForm";
import { StyledButton } from "../../Molecules/PlantTasksList/PlantTasksList.styles";
import {
  EditNoteSectionButtonsWrapper,
  EditNoteSectionFormWrapper,
  EditNoteSectionWrapper,
} from "./EditNoteSection.styles";
import useQueryKey from "../../../Hooks/useQueryKey";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlantNoteDto } from "../../../Interfaces/PlantNoteDto";
import { apiEndpoints } from "../../../Api/endpoints";
import { SettingsSectionWrapper } from "../../Atoms/SettingsSectionWrapper/SettingsSectionWrapper.styles";
import { ActionButton, OrangeButton } from "../../Atoms/Buttons/Buttons";

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
            <OrangeButton type="submit" form="noteEditForm">
              Edytuj
            </OrangeButton>
            <ActionButton onClick={() => navigate(-1)}>Powrót</ActionButton>
          </EditNoteSectionButtonsWrapper>
        </EditNoteSectionFormWrapper>
      )}
    </SettingsSectionWrapper>
  );
};

export default EditNoteSection;
