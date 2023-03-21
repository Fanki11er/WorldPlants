using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;

namespace WorldPlants.Controllers
{
    [Route("Guest")]
    [ApiController]
    public class GuestUserController : Controller
    {
        [HttpPost("Register")]
        public ActionResult RegisterGuestUser([FromBody] RegisterUserDto dto)
        {
            // _accountService.RegisterUser(dto,)
            return Ok();
        }

    }
}
