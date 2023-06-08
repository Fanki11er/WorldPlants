using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;

namespace WorldPlants.Utils
{
    public interface IDatabaseUtils
    {
        Guid AddUserToDatabase(RegisterUserDto dto, Guid spaceId, string accountType);
        void AddToDatabaseUserSettings(string accountType, Guid userId);
        public Guid AddToDatabaseUserSpace();
        public void CheckIfSpaceExists(string spaceId);
    }


    public class DatabaseUtils : IDatabaseUtils
    {
        private readonly WorldPLantsDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public DatabaseUtils(WorldPLantsDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
          
        }

        public Guid AddUserToDatabase(RegisterUserDto dto, Guid spaceId, string accountType)
        {

            var user = new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                AccountType = accountType,
                SpaceId = spaceId,
                PhoneNumber = dto.PhoneNumber,
            };

            var hashedPassword = _passwordHasher.HashPassword(user, dto.Password);
            user.Password = hashedPassword;

            _context.Users.Add(user);
            _context.SaveChanges();
            return user.Id;
        }

        public void AddToDatabaseUserSettings(string accountType, Guid userId)
        {
            var userSettings = new UserSettings()
            {
                UserId = userId,
                ReceiveEmails = accountType == "Owner",
                ReceiveSms = accountType == "Owner",
                CanWaterPlants = true,
                CanMistPlants = true,
                CanFertilizePlants = accountType == "Owner",
                CanRepotPlants = accountType == "Owner",
                CanMovePlants = accountType == "Owner",
                CanAddPlants = accountType == "Owner",
                CanRemovePlants = accountType == "Owner",
                CanEditPlants = accountType == "Owner"
            };
            _context.UserSettings.Add(userSettings);
            _context.SaveChanges();

        }
        public Guid AddToDatabaseUserSpace()
        {
            var userSpace = new Space();

            var id = _context.Add(userSpace).Entity.Id;
            _context.SaveChanges();
            return id;
        }

        public void CheckIfSpaceExists(string spaceId)
        {
            var space = _context.Spaces.Any(s=> s.Id.ToString() == spaceId);
            if (!space)
            {
                throw new NotFoundException("Nie znaleziono przestrzeni użytkownika");
            }
        }
    }
}
