using Microsoft.AspNetCore.Mvc;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("{spaceId}/Guest")]
    [ApiController]
    public class GuestUserController : Controller
    {
        private readonly IGuestUsertService _guestUsertService;

        public GuestUserController(IGuestUsertService guestUsertService)
        {
            _guestUsertService = guestUsertService;
        }

        [HttpPost("Register")]
        public ActionResult RegisterGuestUser([FromRoute] Guid spaceId, [FromBody] RegisterUserDto dto)
        {
            _guestUsertService.RegisterGuestUser(dto, spaceId);
            return Ok();
        }

        [HttpGet()]
        public ActionResult<IEnumerable<SanitizedGuestUserDto>> GetGuestUser([FromRoute] Guid spaceId) {

           var spaceGuestUsers =  _guestUsertService.GetGuestUsers(spaceId);
            return Ok(spaceGuestUsers);
        }
        [HttpDelete()]
        public ActionResult<IEnumerable<SanitizedGuestUserDto>> DeleteGuestUser([FromQuery] Guid spaceId, [FromBody] Guid userId)
        {
            _guestUsertService.DeleteGuestUser(spaceId, userId);
            return NoContent();
        }

    }
}
