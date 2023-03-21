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
        void DeleteUserAndAppAccount(DeleteUserAndAccountDto dto);
    }

    public class OwnerUserService : IOwnerUserService
    {
        private readonly IDatabaseUtils _databaseUtils;
        private readonly WorldPLantsDbContext _context;

        public OwnerUserService(IDatabaseUtils databaseUtils, WorldPLantsDbContext context)
        {
            _databaseUtils = databaseUtils;
            _context = context;
        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = "Owner";

            var spaceId = _databaseUtils.AddToDatabaseUserSpace();
            _databaseUtils.CheckIfSpaceExists(spaceId);

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);
            _databaseUtils.AddToDatabaseUserSettings(accountType, userId);
        }

        public void DeleteUserAndAppAccount(DeleteUserAndAccountDto dto)
        {
            var space = _context.Spaces.Include(i => i.User).FirstOrDefault(s => s.Id.ToString() == dto.SpaceId && s.User.Id.ToString() == dto.UserId && s.User.AccountType == "Owner");
            
            if (space == null)
            {
                throw new NotFoundException("Nie znaleziono przestrzeni uzytkownika");
            }
         
            _context.Spaces.Remove(space);
            _context.SaveChanges();

        }

    }
}
