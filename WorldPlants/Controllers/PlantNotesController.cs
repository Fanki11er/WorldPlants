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
        public async Task<ActionResult> AddNote([FromForm] NewPlantNoteDTO plantNoteDTO, [FromRoute] string plantId) 
        {
            await _plantNotesService.AddNote(plantNoteDTO, plantId);

            return Ok("Notatka utworzona");
        }

        [HttpPost("Edit/{noteId}")]
        public async Task<ActionResult> EditNote([FromForm] NewPlantNoteDTO plantNoteDTO, [FromRoute] string noteId)
        {
            await _plantNotesService.EditNote(plantNoteDTO, noteId);

            return Ok("Zapisano nową wersję notatki");
        }

    }
}
