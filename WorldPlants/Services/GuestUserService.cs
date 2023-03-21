using Microsoft.AspNetCore.Identity;
using WorldPlants.Entities;
using WorldPlants.Models;
using WorldPlants.Utils;

namespace WorldPlants.Services
{
    public interface IGuestUsertService
    {
        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId);
    };
    public class GuestUserService : IGuestUsertService
    {
        private readonly IDatabaseUtils _databaseUtils;

        public GuestUserService(WorldPLantsDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, IDatabaseUtils databaseUtils)
        {
            _databaseUtils = databaseUtils;
        }
        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId)
        {
            string accountType = "Guest";

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);

            _databaseUtils.AddToDatabaseUserSettings(accountType, userId);
        }
    }
}
