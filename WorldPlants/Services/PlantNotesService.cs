using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Models.PlantNotes;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{
    public interface IPlantNotesService
    {
        public List<PlantNoteDTO> GetPlantNotes(string plantId);
        public  Task AddNote(NewPlantNoteDTO note, string plantId);

    }
    public class PlantNotesService: IPlantNotesService
    {

        private IImageService _imageService;
        private IUtilities _utilities;
        private WorldPlantsDbContext _dbContext;
        private IMapper _mapper;
        public PlantNotesService(
            IImageService imageService,
            IUtilities utilities,
            IMapper mapper,
            WorldPlantsDbContext dbContext
            )
        {

            _imageService = imageService;
            _utilities = utilities;
            _dbContext = dbContext;
            _mapper = mapper;

        }
        public List<PlantNoteDTO> GetPlantNotes(string plantId)
        {
            var notes = _dbContext
                .PlantNotes
                .Where(n => n.PlantId.ToString() == plantId)
                .OrderByDescending(o=> o.Id);

           var notesDto = _mapper.Map<List<PlantNoteDTO>>( notes ); 

           return notesDto;
        }

        public  async Task AddNote(NewPlantNoteDTO note, string plantId)
        {
            string? fileName = "";

            var plant = _utilities.FindPlant(plantId);

            if (note.ImageFile != null)
            {
               fileName = await _imageService.SaveImageOnServer(note.ImageFile);
            }

            PlantNote newNote = new()
            {
                Title = note.Title,
                Note = note.Note,
                ImageUrl = fileName,
                PlantId = plant.Id,
                CreationDate = _utilities.GetTodayDate().ToString(),
            };

            _dbContext.PlantNotes.Add(newNote);

            _utilities.SaveChangesToDatabase();

        }

        public void DeletePlantNote(int noteId)
        {

        }

        public void DeleteAllPlantNotes(string plantId)
        {

        }
    }
}
