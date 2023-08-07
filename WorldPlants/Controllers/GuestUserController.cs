// Ignore Spelling: dto

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Guest")]
    [ApiController]
    [Authorize]
    public class GuestUserController : Controller
    {
        private readonly IGuestUserService _guestUserService;

        public GuestUserController(IGuestUserService guestUserService)
        {
            _guestUserService = guestUserService;
        }

        [HttpPost("Register")]
        [Authorize(Roles = "Owner")]
        public ActionResult RegisterGuestUser([FromBody] RegisterUserDto dto)
        {
            _guestUserService.RegisterGuestUser(dto);
            return Ok();
        }

        [HttpGet()]
        [Authorize(Roles = "Owner")]
        public ActionResult<IEnumerable<SanitizedGuestUserDto>> GetGuestUser() {
            
           var spaceGuestUsers =  _guestUserService.GetGuestUsers();
            return Ok(spaceGuestUsers);
        }

        [HttpGet("{userId}")]
        [Authorize(Roles = "Owner")]
        public ActionResult<GuestUserWithPermissionsDto> GetGuestUserPermissions([FromRoute] string userId)
        {
          var guestUserPermissions =   _guestUserService.GetGuestUserPermissions(userId);

            return Ok(guestUserPermissions);
        }

        [HttpPost("ChangePermissions/{userId}")]
        public ActionResult ChangeGuestUserPermissions([FromRoute] string userId ,[FromBody] GuestUserPermissions newPermissions)
        {
            _guestUserService.ChangeGuestUserPermissions(userId, newPermissions);

            return Ok();
        }

        [HttpDelete]
        public ActionResult SelfDeleteGuestUser()
        {
            _guestUserService.SelfDeleteGuestUser();
            
            return NoContent();
        }

        [HttpDelete("{userId}")]
        [Authorize(Roles = "Owner")]
        public ActionResult DeleteGuestUser([FromQuery] string userId)
        {
            _guestUserService.DeleteGuestUser(userId);
            return NoContent();
        }

        [HttpPost("ChangeStatus")]
        [Authorize(Roles = "Owner")]
        public ActionResult ChangeGuestUserStatus([FromBody] ChangeGuestUserStatusDto dto )
        {
            _guestUserService.ChangeGuestUserStatus(dto);
            return Ok();
        }

    }
}
