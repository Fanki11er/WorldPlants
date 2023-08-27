// Ignore Spelling: Utils dto App

using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utilities;
using WorldPlants.Utils;

namespace WorldPlants.Services
{
    public interface IOwnerUserService
    {
        void RegisterOwnerUser(RegisterUserDto dto);
        void DeleteUserAndAppAccount();
    }

    public class OwnerUserService : IOwnerUserService
    {
        private readonly IDatabaseUtils _databaseUtils;
        private readonly WorldPlantsDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IUtilities _Utilities;

        public OwnerUserService(IDatabaseUtils databaseUtils, WorldPlantsDbContext context, IUserContextService userContextService, IUtilities utilities)
        {
            _databaseUtils = databaseUtils;
            _context = context;
            _userContextService = userContextService;
            _Utilities = utilities;
        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = UserRoles.Owner.ToString();
            bool hasPhoneNumber =  dto.PhoneNumber != null;

            var spaceId = _databaseUtils.AddToDatabaseUserSpace();
            _databaseUtils.CheckIfSpaceExists(spaceId.ToString());

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);
            _databaseUtils.AddToDatabaseUserSettings(accountType, userId, hasPhoneNumber);
        }

        public void DeleteUserAndAppAccount()
        {
            var userId = _userContextService.GetUserId;
            var spaceId = _userContextService.GetSpaceId;

            if(spaceId == null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            var space = _context.Spaces
                .Include(i => i.Users)
                .ThenInclude(i => i.UserSettings)
                .Include(i => i.UserSites)
                .ThenInclude(i => i.Plants)
                .FirstOrDefault(s => s.Id.ToString() == spaceId);
            
            if (space == null)
            {
                throw new NotFoundException("Nie znaleziono przestrzeni uzytkownika");
            }

            if(userId is null) { 
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            var isUserSpaceOwner = _context.Users.Any(s => s.Id.ToString() == userId && s.SpaceId.ToString() == spaceId);

            if (!isUserSpaceOwner)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            _context.Spaces.Remove(space);

            _Utilities.SaveChangesToDatabase("Nie udało się usunąć przestrzeni");

        }

    }
}
