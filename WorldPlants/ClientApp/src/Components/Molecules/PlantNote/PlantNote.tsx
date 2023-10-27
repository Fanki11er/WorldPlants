import {
  PlantNoteContent,
  PlantNoteCreationDate,
  PlantNoteImage,
  PlantNoteTitle,
  PlantNoteWrapper,
} from "./PlantNote.styles";
import noImage from "../../../assets/ImageFallback.svg";
import { PlantNoteDto } from "../../../Interfaces/PlantNoteDto";

interface Props {
  note: PlantNoteDto;
}
const PlantNote = (props: Props) => {
  const { note } = props;
  return (
    <PlantNoteWrapper>
      <PlantNoteImage src={note.imageUrl || noImage} />
      <PlantNoteTitle>{note.title}</PlantNoteTitle>
      <PlantNoteCreationDate>{`Utworzono: ${note.creationDate}`}</PlantNoteCreationDate>
      <PlantNoteContent>{note.note}</PlantNoteContent>
    </PlantNoteWrapper>
  );
};

export default PlantNote;
