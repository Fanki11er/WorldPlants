using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Owner")]
    [ApiController]
    [Authorize(Roles ="Owner")]
    public class OwnerUserController : Controller
    {
        private readonly IOwnerUserService _ownerUserService;

        public OwnerUserController(IOwnerUserService ownerUserService)
        {
            _ownerUserService = ownerUserService;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public ActionResult RegisterOwnerUser([FromBody] RegisterUserDto dto)
        {
            _ownerUserService.RegisterOwnerUser(dto);
            return Ok();
        }
        [HttpDelete()]
        public ActionResult DeleteUserAndAppAccount()
        {
           _ownerUserService.DeleteUserAndAppAccount();
            return NoContent();
        }
    }
}
