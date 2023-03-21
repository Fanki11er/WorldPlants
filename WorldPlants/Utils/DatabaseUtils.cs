using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Models;

namespace WorldPlants.Utils
{
    public interface IDatabaseUtils
    {
        Guid AddUserToDatabase(RegisterUserDto dto, Guid spaceId, string accountType);
        void AddToDatabaseUserSettings(string accountType, Guid userId);
        public Guid AddToDatabaseUserSpace();
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
            };

            var hashedPassword = _passwordHasher.HashPassword(user, dto.Password);
            user.Password = hashedPassword;

            var id = _context.Users.Add(user).Entity.Id;
            _context.SaveChanges();
            return id;
        }

        public void AddToDatabaseUserSettings(string accountType, Guid userId)
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
        public Guid AddToDatabaseUserSpace()
        {
            var userSpace = new Space();

            var id = _context.Add(userSpace).Entity.Id;
            _context.SaveChanges();
            return id;
        }
    }
}
