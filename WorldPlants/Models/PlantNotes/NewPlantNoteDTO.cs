namespace WorldPlants.Models.PlantNotes
{
    public class NewPlantNoteDTO
    {
        public string Title { get; set; }
        public string Note { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
