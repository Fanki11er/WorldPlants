using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Guest")]
    [ApiController]
    [Authorize(Roles = "Owner")]
    public class GuestUserController : Controller
    {
        private readonly IGuestUsertService _guestUserService;

        public GuestUserController(IGuestUsertService guestUserService)
        {
            _guestUserService = guestUserService;
        }

        [HttpPost("Register")]
        public ActionResult RegisterGuestUser([FromBody] RegisterUserDto dto)
        {
            _guestUserService.RegisterGuestUser(dto);
            return Ok();
        }

        [HttpGet()]
        public ActionResult<IEnumerable<SanitizedGuestUserDto>> GetGuestUser() {
            
           var spaceGuestUsers =  _guestUserService.GetGuestUsers();
            return Ok(spaceGuestUsers);
        }
        [HttpDelete("{userId}")]
        public ActionResult<IEnumerable<SanitizedGuestUserDto>> DeleteGuestUser([FromQuery] string userId)
        {
            _guestUserService.DeleteGuestUser(userId);
            return NoContent();
        }

    }
}
