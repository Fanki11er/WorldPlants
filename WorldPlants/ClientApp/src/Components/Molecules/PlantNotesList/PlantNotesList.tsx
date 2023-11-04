import { useNavigate, useParams } from "react-router-dom";
import { PlantNoteDto } from "../../../Interfaces/PlantNoteDto";
import {
  PlantNoteListItem,
  PlantNotesItemButtonsWrapper,
  PlantNotesListWrapper,
} from "./PlantNotesList.styles";
import { paths } from "../../../Router/paths";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import useQueryKey from "../../../Hooks/useQueryKey";
import { useMutation, useQueryClient } from "react-query";
import { apiEndpoints } from "../../../Api/endpoints";
import FormRequestError from "../../Molecules/FormRequestError/FormRequestError";
import { getErrorMessages } from "../../../Utils/Utils";
import PlantNote from "../PlantNote/PlantNote";
import {
  GenerateQRButton,
  RedButtonWithoutMargin,
} from "../../Atoms/Buttons/Buttons";

interface Props {
  notes: PlantNoteDto[];
}

const PlantNotesList = (props: Props) => {
  const { notes } = props;
  const { deleteNote } = apiEndpoints;
  const { plantId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { plantNotesQueryKey } = useQueryKey();
  const client = useQueryClient();
  const { authorized, selectedPlant, selectedPlanEditNote } = paths;
  const navigate = useNavigate();
  const { error, mutate } = useMutation({
    mutationFn: async (id: number) => {
      const result = await axiosPrivate.delete(deleteNote(id));
      return result.data;
    },
    onSuccess: () => {
      client.invalidateQueries(plantNotesQueryKey(plantId));
    },
  });

  const deleteItem = (itemId: number) => {
    mutate(itemId);
  };

  const renderNotes = (notes: PlantNoteDto[]) => {
    return notes.map((note) => {
      return (
        <PlantNoteListItem key={note.id}>
          <PlantNote note={note} />
          <PlantNotesItemButtonsWrapper>
            <GenerateQRButton
              onClick={() =>
                navigate(
                  `${authorized}/${selectedPlant}/${plantId}/${selectedPlanEditNote}/${note.id}`
                )
              }
            >
              Edycja
            </GenerateQRButton>
            <RedButtonWithoutMargin onClick={() => deleteItem(note.id)}>
              Usuń
            </RedButtonWithoutMargin>
          </PlantNotesItemButtonsWrapper>
          {error ? (
            <FormRequestError errorValues={getErrorMessages(error)} />
          ) : null}
        </PlantNoteListItem>
      );
    });
  };
  return <PlantNotesListWrapper>{renderNotes(notes)}</PlantNotesListWrapper>;
};

export default PlantNotesList;
