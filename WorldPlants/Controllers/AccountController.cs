using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("RegisterOwner")]
        public ActionResult RegisterOwnerUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterOwnerUser(dto);
            return Ok();
        }
        [HttpPost("RegisterGuest")]
        public ActionResult RegisterGuestUser([FromBody] RegisterUserDto dto)
        {
            // _accountService.RegisterUser(dto,)
            return Ok();
        }

    }
}
