using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [ApiController]
    [Route("Recognize")]
    [Authorize]
    public class RecognizerController : Controller
    {
        private readonly IRecognizerService _recognizerService;
        public RecognizerController(IRecognizerService recognizerService)
        {
            _recognizerService = recognizerService;
        }

        [HttpPost]
        public async Task<ActionResult<List<RecognizedPlantDto>>> RecognizePlant([FromForm] List<IFormFile> imageFile)
        {
            var result = await _recognizerService.RecognizePlant(imageFile);

            return Ok(result);
        }

    }

}




