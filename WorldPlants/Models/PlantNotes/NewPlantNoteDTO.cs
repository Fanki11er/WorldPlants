namespace WorldPlants.Models.PlantNotes
{
    public class NewPlantNoteDTO
    {
        public string title { get; set; }
        public string note { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
