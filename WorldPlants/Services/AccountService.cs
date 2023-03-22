using Microsoft.AspNetCore.Identity;
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
    };

    public class AccountService : IAccountService
    {
        private readonly WorldPLantsDbContext _context;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(WorldPLantsDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public LoggedUserDto LoginUser(LoginUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (user is null)
            {
                throw new BadRequestException("Błędne imię lub hasło");
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
           
            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Błędne imię lub hasło");
            }

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

    }
}
