// Ignore Spelling: dto Utils

using Microsoft.AspNetCore.Identity;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utilities;

namespace WorldPlants.Utils
{
    public interface IDatabaseUtils
    {
        Guid AddUserToDatabase(RegisterUserDto dto, Guid spaceId, string accountType);
        void AddToDatabaseUserSettings(string accountType, Guid userId, bool hasPhoneNumber);
        public Guid AddToDatabaseUserSpace();
        public void CheckIfSpaceExists(string spaceId);

        public void AddStandardTasks(Guid spaceId);
    }


    public class DatabaseUtils : IDatabaseUtils
    {
        private readonly WorldPlantsDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IUtilities _utilities;

        public DatabaseUtils(
            WorldPlantsDbContext context, 
            IPasswordHasher<User> passwordHasher, 
            IUtilities utilities)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _utilities = utilities;

        }

        public Guid AddUserToDatabase(RegisterUserDto dto, Guid spaceId, string accountType)
        {
            var today = _utilities.GetTodayDateTime();

            var user = new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                AccountType = accountType,
                SpaceId = spaceId,
                PhoneNumber = dto.PhoneNumber,
                LastEmailReminderSendDate = today,
                LastSMSReminderSendDate = today
            };

            var hashedPassword = _passwordHasher.HashPassword(user, dto.Password);
            user.Password = hashedPassword;

            _context.Users.Add(user);
            _context.SaveChanges();
            return user.Id;
        }

        public void AddToDatabaseUserSettings(string accountType, Guid userId, bool hasPhoneNumber)
        {
            var userSettings = new UserSettings()
            {
                UserId = userId,
                WaterPlantsEmailReminder = true,
                WaterPlantsSmsReminder = hasPhoneNumber,
                FertilizePlantsEmailReminder = accountType == UserRoles.Owner.ToString(),
                FertilizePlantsSmsReminder = hasPhoneNumber && accountType == UserRoles.Owner.ToString(),
                CutPlantsEmailReminder = accountType == UserRoles.Owner.ToString(),
                CutPlantsSmsReminder = hasPhoneNumber && accountType == UserRoles.Owner.ToString(),
                ReplantPlantsEmailReminder = accountType == UserRoles.Owner.ToString(),
                ReplantPlantsSmsReminder = hasPhoneNumber && accountType == UserRoles.Owner.ToString(),
                MistPlantsEmailReminder = accountType == UserRoles.Owner.ToString(),
                MistPlantsSmsReminder = hasPhoneNumber && accountType == UserRoles.Owner.ToString(),
                // Plants Permissions
                CanMovePlants = accountType == UserRoles.Owner.ToString(),
                CanAddPlants = accountType == UserRoles.Owner.ToString(),
                CanRemovePlants = accountType == UserRoles.Owner.ToString(),
                CanEditPlants = accountType == UserRoles.Owner.ToString(),
                // Sites Permissions
                CanAddSites = accountType == UserRoles.Owner.ToString(),
                CanRemoveSites = accountType == UserRoles.Owner.ToString(),
                CanEditSites = accountType == UserRoles.Owner.ToString(),
                // TasksPermissions
                CanCreateCustomTasks = accountType == UserRoles.Owner.ToString(),

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
            var space = _context.Spaces.Any(s => s.Id.ToString() == spaceId);
            if (!space)
            {
                throw new NotFoundException("Nie znaleziono przestrzeni użytkownika");
            }
        }

        public void AddStandardTasks(Guid spaceId)
        {
            CheckIfSpaceExists(spaceId.ToString());

            List<ActionType> actionTypes = new List<ActionType>()
            {
                new ActionType()
                {
                    Name = StandardActionType.Water.ToString(),
                    Description= "Podlewanie",
                    SpaceId = spaceId,
                    StandardType = true
                },

                new ActionType()
                {
                    Name =  StandardActionType.Fertilize.ToString(),
                    Description = "Nawożenie",
                    SpaceId = spaceId,
                    StandardType = true
                },

                new ActionType()
                {
                    Name =  StandardActionType.Cut.ToString(),
                    Description = "Przycinanie",
                    SpaceId = spaceId,
                    StandardType = true
                },

                new ActionType()
                {
                    Name =  StandardActionType.Replant.ToString(),
                    Description = "Przesadzanie",
                    SpaceId = spaceId,
                    StandardType = true
                },

                new ActionType()
                {
                    Name =  StandardActionType.Mist.ToString(),
                    Description = "Zwilżanie",
                    SpaceId = spaceId,
                    StandardType = true
                },
            };

            _context.ActionTypes.AddRange(actionTypes);

            _context.SaveChanges();
        }
    }
}
