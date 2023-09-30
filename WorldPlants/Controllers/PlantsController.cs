// Ignore Spelling: Dto

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Models.PlantsModels;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Plants")]
    [ApiController]
    [Authorize]
    public class PlantsController : Controller
    {
        private readonly IPlantService _plantService;
        public PlantsController(IPlantService plantService)
        {
            _plantService = plantService;
        }

        [HttpGet("Search")]
        public async Task<ActionResult<SearchPlantResultDto>> SearchForPlant([FromQuery] string searchPhrase)
        {
            var result = await _plantService.SearchForPlant(searchPhrase);

            return Ok(result);
        }

        [HttpGet("Details/{plantId}")]
        public async Task<ActionResult<PlantBasicInformationDto>> SearchForPlant([FromRoute] int plantId)
        {
            var result = await _plantService.GetPlantDetails(plantId);

            return Ok(result);
        }

        [HttpPost("Add/{siteId}")]
        public async Task<ActionResult<string>> AddPlant([FromForm] AddPlantDto plantDto, [FromRoute]int siteId)
        {
         var plantId =   await _plantService.AddPlant(plantDto, siteId);

            return Ok(plantId);
        }

        [HttpGet("HeaderInfo/{plantId}")]
        public ActionResult<PlantHeaderInformationDTO> GetPlantHeaderInformationData([FromRoute] string plantId)
        {
            var result =_plantService.GetPlantHeaderInformationData(plantId);

            return Ok(result);
        }

        [HttpGet("Tips/{plantId}")]
        public async Task<ActionResult<PlantTipsDTO?>> GetPlantTips([FromRoute] string plantId)
        {
            var result = await _plantService.GetPlantTips(plantId);

            return Ok(result);
        }

        [HttpGet("ExternalId/{plantId}")]
        public ActionResult<int?> GetPlantExternalId([FromRoute] string plantId)
        {
            var result = _plantService.GetPlantExternalId(plantId);

            return Ok(result);
        }

        [HttpGet("Settings/{plantId}")]
        public ActionResult<PlantCurrentSettingsDTO> GetPlantCurrentSettings([FromRoute] string plantId)
        {
            var result = _plantService.GetPlantCurrentSettings(plantId);

            return Ok(result);
        }

        [HttpPost("Settings/{plantId}")]
        public async Task<ActionResult<string>> EditCurrentPlantSettings([FromRoute] string plantId, [FromForm] AddPlantDto newSettings)
        {
           var result =  await _plantService.EditCurrentPlantSettings(plantId, newSettings);

            return Ok(result);
        }

        [HttpGet("MoveInformation/{plantId}")]
        public ActionResult<MovePlantInformationDTO> GetMovePlantInformation([FromRoute] string plantId)
        {
            var result = _plantService.GetMovePlantInformation(plantId);

            return Ok(result);
        }
    }
}
