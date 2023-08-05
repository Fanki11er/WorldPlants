// Ignore Spelling: dto Sms

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Models;
using WorldPlants.Services;

namespace WorldPlants.Controllers
{
    [Route("Account")]
    [ApiController]
    [Authorize]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public ActionResult<LoggedUserDto> LoginUser([FromBody] LoginUserDto dto)
        {
            var loggedUserDto = _accountService.LoginUser(dto);
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

        [HttpGet("Settings")]
        public ActionResult<AccountSettingsDto> GetAccountSettings()
        {
            var actualSettings = _accountService.GetAccountSettings();

            return Ok(actualSettings);
        }

        [HttpPost("Settings")]
        public ActionResult ChangeAccountSettings([FromBody] AccountSettingsDto dto)
        {
            _accountService.ChangeAccountSettings(dto);

            return Ok();
        }

        [HttpPost("Security")]
        public ActionResult ChangeSecuritySettings([FromBody] UserChangePasswordDto dto)
        {
            _accountService.ChangeUserPassword(dto);

            return Ok();
        }

    }
}
