// Ignore Spelling: dto Sms

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

        [HttpPost("Login")]
        public ActionResult<LoggedUserDto> LoginUser([FromBody] LoginUserDto dto)
        {
            var loggedUserDto = _accountService.LoginUser(dto);
            return Ok(loggedUserDto);
        }

        [HttpPost("ChangeUserPassword")]

        public ActionResult<LoggedUserDto> ChangeUserPassword([FromBody] UserChangePasswordDto dto)
        {
            var loggedUserDto = _accountService.ChangeUserPassword(dto);

            return Ok(loggedUserDto);
        }

        [HttpGet("NotificationsSettings")]
        public ActionResult<CurrentNotificationsSettingsDto> GetNotificationSettings()
        {
            var settings = _accountService.GetNotificationSettings();
            return Ok(settings);
        }

        [HttpPost("EmailNotificationsSettings")]
        public ActionResult UpdateEmailNotificationsSettings([FromBody] NotificationSettingsDto dto)
        {
            _accountService.UpdateEmailNotificationsSettings(dto);

            return Ok();
        }

        [HttpPost("SmsNotificationsSettings")]
        public ActionResult UpdateSmsNotificationsSettings([FromBody] NotificationSettingsDto dto)
        {
            _accountService.UpdateSmsNotificationsSettings(dto);

            return Ok();
        }

    }
}
