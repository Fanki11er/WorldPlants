using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models.PlantNotes;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Notes")]
    [ApiController]
    [Authorize]
    public class PlantNotesController : Controller
    {

        private IPlantNotesService _plantNotesService;

        public PlantNotesController(IPlantNotesService plantNotesService)
        {
                _plantNotesService = plantNotesService;
        }

        [HttpGet("{plantId}")]
        public ActionResult<List<PlantNoteDTO>> GetPlantNotes([FromRoute] string plantId)
        {
            var results = _plantNotesService.GetPlantNotes(plantId);

            return Ok(results);
        }

        [HttpPost("Add/{plantId}")]
        public async Task<ActionResult> AddNote([FromRoute]string plantId, [FromForm] NewPlantNoteDTO note) 
        {
            await _plantNotesService.AddNote(note, plantId);

            return Ok("Notatka utworzona");
        }

    }
}
