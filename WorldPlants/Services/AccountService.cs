using Microsoft.AspNetCore.Identity;
using WorldPlants.Entities;
using WorldPlants.Models;

namespace WorldPlants.Services
{

    public interface IAccountService
    {
        public void RegisterOwnerUser(RegisterUserDto dto);
        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId);
    };

    public class AccountService: IAccountService
    {
        private readonly WorldPLantsDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(WorldPLantsDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = "Owner";
            if (!CheckIfPasswordAndRepeatedPasswordAreTheSame(dto.Password, dto.RepeatedPassword))
            {
                throw new ArgumentException("Passwords are not the same");
            }
            if (UserWithGivenEmailExists(dto.Email))
            {
                throw new ArgumentException("Email exists");
            };

            var spaceId = AddToDatabaseUserSpace();
            var userId = AddUserToDatabase(dto, spaceId, accountType);
            AddToDatabaseUserSettings(accountType, userId);
        }

        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId)
        {
            string accountType = "Guest";
            if (!CheckIfPasswordAndRepeatedPasswordAreTheSame(dto.Password, dto.RepeatedPassword))
            {
                throw new ArgumentException("Passwords are not the same");
            };
            if (UserWithGivenEmailExists(dto.Email))
            {
                throw new ArgumentException("Email exists");
            };


            var userId = AddUserToDatabase(dto, spaceId, accountType);

            AddToDatabaseUserSettings(accountType, userId);


        }

        private bool CheckIfPasswordAndRepeatedPasswordAreTheSame(string password, string repeatedPassword)
        {
            if (password == repeatedPassword)
            {
                return true;
            }
            return false;
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
                ReceiveEmails = accountType == "Owner" ? true : false,
                CanWaterPlants = true,
                CanMistPlants = true,
                CanFertilizePlants = accountType == "Owner" ? true : false,
                CanRepotPlants = accountType == "Owner" ? true : false,
                CanMovePlants = accountType == "Owner" ? true : false,
                AddPlants = accountType == "Owner" ? true : false,
                RemovePlants = accountType == "Owner" ? true : false,
                EditPlants = accountType == "Owner" ? true : false
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

        private bool UserWithGivenEmailExists(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email );
            return user != null? true: false;
        }
    }
}
