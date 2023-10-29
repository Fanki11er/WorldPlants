using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models.CustomActionTypes;
using WorldPlants.Models.CustomTaskModels;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("CustomTasks")]
    [ApiController]
    [Authorize]
    public class CustomActionTypesController : Controller
    {
        private readonly ICustomActionTypesService _customActionTypesService;

        public CustomActionTypesController(ICustomActionTypesService customActionTypesService)
        {
            _customActionTypesService = customActionTypesService;
        }

        [HttpPost("Add")]
        public ActionResult AddCustomActionType(AddCustomActionTypeDTO newType)
        {
            _customActionTypesService.AddCustomActionType(newType);

            return Ok("Nowy typ akcji utworzony");
        }

        [HttpGet("Information")]
        public ActionResult<List<CustomActionTypeInformationDTO>> GetCustomActionTypesInformation()
        {
            var result = _customActionTypesService.GetCustomActionTypesInformation();

            return Ok(result);
        }


    }
}
