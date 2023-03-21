using Microsoft.AspNetCore.Mvc;
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

    }
}
