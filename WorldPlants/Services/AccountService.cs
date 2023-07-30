// Ignore Spelling: dto

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;

namespace WorldPlants.Services
{

    public interface IAccountService
    {
        public LoggedUserDto LoginUser(LoginUserDto dto);
        public LoggedUserDto ChangeUserPassword(UserChangePasswordDto dto);
    };

    public class AccountService : IAccountService
    {
        private readonly WorldPlantsDbContext _context;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IUserContextService _userContextService;

        public AccountService(WorldPlantsDbContext context, IPasswordHasher<User> passwordHasher, IUserContextService userContextService, AuthenticationSettings authenticationSettings)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _userContextService = userContextService;
            _authenticationSettings = authenticationSettings;
        }

        public LoggedUserDto LoginUser(LoginUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (user is null)
            {
                throw new BadRequestException("Błędne imię lub hasło");
            }

            VeryfiPassword(user, dto.Password, "Błędne imię lub hasło");

            var token = GenerateJWT(user);

            var loggedUserDto = new LoggedUserDto()
            {
                Name = user.Name,
                Token = token,
                AccountType = user.AccountType
            };

            return loggedUserDto;

        }

        public LoggedUserDto ChangeUserPassword(UserChangePasswordDto dto)
        {
            var userId = _userContextService.GetUserId;

            if (userId is null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId);

            if (user is null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            VeryfiPassword(user, dto.Password, "Błędne imię lub hasło");

            user.Password = _passwordHasher.HashPassword(user, dto.NewPassword);
            
            var token = GenerateJWT(user);

            var loggedUserDto = new LoggedUserDto()
            {
                Name = user.Name,
                Token = token,
            };

            return loggedUserDto;

        }

        private string GenerateJWT(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Name}"),
                new Claim(ClaimTypes.Email, $"{user.Email}"),
                new Claim(ClaimTypes.Role, $"{user.AccountType}"),
                new Claim("SpaceIdentifier", $"{user.SpaceId}")

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        private void VeryfiPassword(User user, string passwordToVeryfy, string errorMessage)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password,passwordToVeryfy);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException(errorMessage);
            }
        }

    }
}
