using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Owner")]
    [ApiController]
    public class OwnerUserController : Controller
    {
        private readonly IOwnerUserService _ownerUserService;

        public OwnerUserController(IOwnerUserService ownerUserService)
        {
            _ownerUserService = ownerUserService;
        }

        [HttpPost("Register")]
        public ActionResult RegisterOwnerUser([FromBody] RegisterUserDto dto)
        {
            _ownerUserService.RegisterOwnerUser(dto);
            return Ok();
        }
    }
}
