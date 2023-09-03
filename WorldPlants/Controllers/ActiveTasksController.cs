using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models.ActiveTasksModels;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Tasks")]
    [ApiController]
    [Authorize]
    public class ActiveTasksController : Controller
    {
        private readonly IActiveTasksService _activeTasksService;
        public ActiveTasksController(IActiveTasksService activeTasksService)
        {
            _activeTasksService = activeTasksService;
        }

        [HttpGet("Standard/{plantId}/{taskType}")]
        public ActionResult<ActiveTaskDTO?> GetStandardTask([FromRoute] string plantId, [FromRoute] string taskType) 
        {
            var result = _activeTasksService.GetStandardPlantTask(plantId, taskType);

            return Ok(result);
        }
    }
}
