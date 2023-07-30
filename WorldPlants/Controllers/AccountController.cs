﻿// Ignore Spelling: dto

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

    }
}
