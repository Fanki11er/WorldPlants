using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models.PlantNotes;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{
    public interface IPlantNotesService
    {
        public List<PlantNoteDTO> GetPlantNotes(string plantId);
        public  Task AddNote(NewPlantNoteDTO note, string plantId);
        public Task EditNote(NewPlantNoteDTO note, string noteId);

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
            List< PlantNoteDTO> newNotesDtos = new();
            var notes = _dbContext
                .PlantNotes
                .Where(n => n.PlantId.ToString() == plantId)
                .OrderByDescending(o=> o.Id); 
           
            foreach( var note in notes )
            {
                var newDto = new PlantNoteDTO()
                {
                    ImageUrl = _imageService.GetImageUrl(note.ImageUrl),
                    Title = note.Title,
                    Note = note.Note,
                    CreationDate = note.CreationDate,
                };
                newNotesDtos.Add(newDto);
            }

            return newNotesDtos;
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
                Title = note.title,
                Note = note.note,
                ImageUrl = fileName,
                PlantId = plant.Id,
                CreationDate = _utilities.GetTodayDate().ToString(),
            };

            _dbContext.PlantNotes.Add(newNote);

            _utilities.SaveChangesToDatabase();

        }

        public async Task EditNote(NewPlantNoteDTO note, string noteId)
        {
            string? fileName = "";

            var oldNote = _dbContext
                .PlantNotes
                .FirstOrDefault(o => o.Id.ToString() == noteId) ?? 
                throw new NotFoundException("Nie odnaleziono notatki");

            if (note.ImageFile != null)
            {
                _imageService.DeleteImage(oldNote.ImageUrl);

                fileName = await _imageService.SaveImageOnServer(note.ImageFile);

                oldNote.ImageUrl = fileName;
            }

            oldNote.Title = note.title;
            oldNote.Note = note.note;
            
            _dbContext.Update(oldNote);

            _utilities .SaveChangesToDatabase();

        }

        public void DeletePlantNote(int noteId)
        {

        }

        public void DeleteAllPlantNotes(string plantId)
        {

        }
    }
}
