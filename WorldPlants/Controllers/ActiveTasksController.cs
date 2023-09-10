using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Entities;
using WorldPlants.Models;
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
        public ActionResult<ActiveTaskDTO> GetStandardTask([FromRoute] string plantId, [FromRoute] string taskType) 
        {
            var result = _activeTasksService.GetStandardPlantTask(plantId, taskType);

            return Ok(result);
        }

        [HttpPost("SetTask")]
        public ActionResult<ActiveTaskDTO> SetPlantTask( ActiveTaskDTO task)
        {
            var result = _activeTasksService.SetPlantTask(task);

            return Ok(result);
        }

        [HttpDelete("{taskId}")]
        public ActionResult DeleteTask(string taskId)
        {
            _activeTasksService.DeletePlantTask(taskId);

            return NoContent();
        }

        [HttpGet("AllTasks/{plantId}")]
        public ActionResult<List<ActiveTaskInformationDto>> GetPlantAllTasks([FromRoute]string plantId)
        {
            var result = _activeTasksService.GetPlantAllTasks(plantId);

            return Ok(result);
        }

        [HttpPost("Snooze/{taskId}")]
        public ActionResult<ActiveTask> SnoozeTask([FromRoute] string taskId)
        {
            var result = _activeTasksService.SnoozeTask(taskId);

            return Ok(result);
        }

        [HttpPost("Skip/{taskId}")]
        public ActionResult<ActiveTask?> SkipTask([FromRoute] string taskId)
        {
            var result = _activeTasksService.SkipTask(taskId);

            return Ok(result);
        }

        [HttpPost("Execute/{taskId}")]
        public ActionResult<ActiveTask?> ExecuteTask([FromRoute] string taskId)
        {
            var result = _activeTasksService.ExecuteTask(taskId);

            return Ok(result);
        }
    }
}
