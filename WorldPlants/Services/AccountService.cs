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
        public void RegisterOwnerUser(RegisterUserDto dto);
        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId);
        public string GenerateJWT(LoginUserDto dto);
    };

    public class AccountService : IAccountService
    {
        private readonly WorldPLantsDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;



        public AccountService(WorldPLantsDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = "Owner";

            var spaceId = AddToDatabaseUserSpace();
            var userId = AddUserToDatabase(dto, spaceId, accountType);
            AddToDatabaseUserSettings(accountType, userId);
        }

        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId)
        {
            string accountType = "Guest";

            var userId = AddUserToDatabase(dto, spaceId, accountType);

            AddToDatabaseUserSettings(accountType, userId);

        }

        public string GenerateJWT(LoginUserDto dto)
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

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Name}"),
                new Claim(ClaimTypes.Email, $"{user.Email}"),
                new Claim(ClaimTypes.Role, $"{user.AccountType}")

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

        private Guid AddUserToDatabase(RegisterUserDto dto, Guid spaceId, string accountType)
        {

            var user = new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                AccountType = accountType,
                SpaceId = spaceId,
            };

            var hashedPassword = _passwordHasher.HashPassword(user, dto.Password);
            user.Password = hashedPassword;

            var id = _context.Users.Add(user).Entity.Id;
            _context.SaveChanges();
            return id;
        }

        private void AddToDatabaseUserSettings(string accountType, Guid userId)
        {
            var userSettings = new UserSettings()
            {
                UserId = userId,
                ReceiveEmails = accountType == "Owner",
                CanWaterPlants = true,
                CanMistPlants = true,
                CanFertilizePlants = accountType == "Owner",
                CanRepotPlants = accountType == "Owner",
                CanMovePlants = accountType == "Owner",
                AddPlants = accountType == "Owner",
                RemovePlants = accountType == "Owner",
                EditPlants = accountType == "Owner"
            };
            _context.UserSettings.Add(userSettings);
            _context.SaveChanges();

        }
        private Guid AddToDatabaseUserSpace()
        {
            var userSpace = new Space();

            var id = _context.Add(userSpace).Entity.Id;
            _context.SaveChanges();
            return id;
        }

    }
}
