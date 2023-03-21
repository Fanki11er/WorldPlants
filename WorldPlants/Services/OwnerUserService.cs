using WorldPlants.Models;
using WorldPlants.Utils;

namespace WorldPlants.Services
{
    public interface IOwnerUserService
    {
        void RegisterOwnerUser(RegisterUserDto dto);
    }

    public class OwnerUserService : IOwnerUserService
    {
        private readonly IDatabaseUtils _databaseUtils;
        public OwnerUserService(IDatabaseUtils databaseUtils)
        {
            _databaseUtils = databaseUtils;
        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = "Owner";

            var spaceId = _databaseUtils.AddToDatabaseUserSpace();
            _databaseUtils.CheckIfSpaceExists(spaceId);

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);
            _databaseUtils.AddToDatabaseUserSettings(accountType, userId);
        }

    }
}
