using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;
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
        private readonly WorldPLantsDbContext _context;
        private readonly IUserContextService _userContextService;

        public OwnerUserService(IDatabaseUtils databaseUtils, WorldPLantsDbContext context, IUserContextService userContextService)
        {
            _databaseUtils = databaseUtils;
            _context = context;
            _userContextService = userContextService;
        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = "Owner";

            var spaceId = _databaseUtils.AddToDatabaseUserSpace();
            _databaseUtils.CheckIfSpaceExists(spaceId.ToString());

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);
            _databaseUtils.AddToDatabaseUserSettings(accountType, userId);
        }

        public void DeleteUserAndAppAccount()
        {
            var userId = _userContextService.GetUserId;
            var spaceId = _userContextService.GetSpaceId;

            if(spaceId == null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            var space = _context.Spaces.FirstOrDefault(s => s.Id.ToString() == spaceId);
            
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
            _context.SaveChanges();

        }

    }
}
