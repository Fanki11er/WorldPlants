// Ignore Spelling: dto Sms

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
        public void ChangeUserPassword(UserChangePasswordDto dto);
        public CurrentNotificationsSettingsDto GetNotificationSettings();
        public void UpdateEmailNotificationsSettings(NotificationSettingsDto dto);
        public void UpdateSmsNotificationsSettings(NotificationSettingsDto dto);
        public AccountSettingsDto GetAccountSettings();
        public void ChangeAccountSettings(AccountSettingsDto dto);
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

        public void ChangeUserPassword(UserChangePasswordDto dto)
        {

            var user = GetUser();

            VeryfiPassword(user, dto.Password, "Błędne imię lub hasło");

            user.Password = _passwordHasher.HashPassword(user, dto.NewPassword);
            _context.Update(user);

            int changesCounter = _context.SaveChanges();

            if (changesCounter == 0)
            {
                throw new NotUpdatedException("Nie udało się zaktualizować ustawień powiadomień Sms");
            }

        }

        public CurrentNotificationsSettingsDto GetNotificationSettings()
        {
            var user = GetUser();

            var settings = GetUserSettings(user);

            NotificationSettingsDto EmailSettings = new()
            {
                WaterPlantsReminder = settings.WaterPlantsEmailReminder,
                FertilizePlantsReminder = settings.FertilizePlantsEmailReminder,
                CutPlantsReminder = settings.CutPlantsEmailReminder,
                ReplantPlantsReminder = settings.ReplantPlantsEmailReminder,
                MistPlantsReminder = settings.MistPlantsEmailReminder

            };

            NotificationSettingsDto? SmsSettings = null;

            if(user.PhoneNumber != null)
            {
                SmsSettings = new NotificationSettingsDto()
                {
                    WaterPlantsReminder = settings.WaterPlantsSmsReminder,
                    FertilizePlantsReminder = settings.FertilizePlantsSmsReminder,
                    CutPlantsReminder = settings.CutPlantsSmsReminder,
                    ReplantPlantsReminder = settings.ReplantPlantsSmsReminder,
                    MistPlantsReminder = settings.MistPlantsSmsReminder
                };
            }

            CurrentNotificationsSettingsDto settingsDto = new()
            {
                EmailSettings = EmailSettings,
                SmsSettings = SmsSettings,
            };

            return settingsDto;
        }

        public void UpdateEmailNotificationsSettings(NotificationSettingsDto dto)
        {
            var user = GetUser();

            var settings = GetUserSettings(user);

            settings.WaterPlantsEmailReminder = dto.WaterPlantsReminder;
            settings.FertilizePlantsEmailReminder = dto.FertilizePlantsReminder;
            settings.CutPlantsEmailReminder = dto.CutPlantsReminder;
            settings.ReplantPlantsEmailReminder = dto.ReplantPlantsReminder;
            settings.MistPlantsEmailReminder= dto.MistPlantsReminder;

            _context.Update(settings);
            int changesCounter =  _context.SaveChanges();

            if(changesCounter == 0) { 
                throw new NotUpdatedException("Nie udało się zaktualizować ustawień powiadomień mailowych");
            }
        }

        public void UpdateSmsNotificationsSettings(NotificationSettingsDto dto)
        {
            var user = GetUser();

            var settings = GetUserSettings(user);

            settings.WaterPlantsSmsReminder = dto.WaterPlantsReminder;
            settings.FertilizePlantsSmsReminder = dto.FertilizePlantsReminder;
            settings.CutPlantsSmsReminder = dto.CutPlantsReminder;
            settings.ReplantPlantsSmsReminder = dto.ReplantPlantsReminder;
            settings.MistPlantsSmsReminder = dto.MistPlantsReminder;

            _context.Update(settings);
            int changesCounter = _context.SaveChanges();

            if (changesCounter == 0)
            {
                throw new NotUpdatedException("Nie udało się zaktualizować ustawień powiadomień Sms");
            }
        }

    
     

       public AccountSettingsDto GetAccountSettings()
        {
            var user = GetUser();

            AccountSettingsDto actualAccountSettings = new()
            {
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };

            return actualAccountSettings;
        }

        public void ChangeAccountSettings(AccountSettingsDto dto)
        {
            var user = GetUser();
            if(user.Name != dto.Name)
            {
                user.Name = dto.Name;
            }

            if(user.Email != dto.Email)
            {
                user.Email = dto.Email;
            }

            if(user.PhoneNumber != dto.PhoneNumber)
            {
                user.PhoneNumber = dto.PhoneNumber != ""? dto.PhoneNumber : null ;
            }
            _context.Update(user);

            int changesCounter = _context.SaveChanges();

            if (changesCounter == 0)
            {
                throw new NotUpdatedException("Nie udało się zaktualizować ustawień powiadomień Sms");
            }
        }

        private User GetUser()
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

            return user;
        }

        private  UserSettings GetUserSettings(User user)
        {
            var settings = _context.UserSettings.FirstOrDefault(s => s.User == user);

            if (settings is null)
            {
                throw new NotFoundException("Nie odnaleziono ustawień dla użytkownika");
            }

            return settings;
        }

        private void VeryfiPassword(User user, string passwordToVeryfy, string errorMessage)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, passwordToVeryfy);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException(errorMessage);
            }
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
