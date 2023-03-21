using AutoMapper;
using Microsoft.AspNetCore.Identity;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utils;

namespace WorldPlants.Services
{
    public interface IGuestUsertService
    {
        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId);
        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers(Guid spaceId);
        public void DeleteGuestUser(Guid spaceId, Guid userId);
    };
    public class GuestUserService : IGuestUsertService
    {
        private readonly WorldPLantsDbContext _context;
        private readonly IDatabaseUtils _databaseUtils;
        private readonly IMapper _mapper;

        public GuestUserService(WorldPLantsDbContext context, IDatabaseUtils databaseUtils, IMapper mapper)
        {
            _context = context;
            _databaseUtils = databaseUtils;
            _mapper = mapper;
        }
        public void RegisterGuestUser(RegisterUserDto dto, Guid spaceId)
        {
            string accountType = "Guest";

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);

            _databaseUtils.AddToDatabaseUserSettings(accountType, userId);
        }

        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers(Guid spaceId) {
            _databaseUtils.CheckIfSpaceExists(spaceId);
            var guestUsersEntities = _context.Users.Where(u => u.SpaceId == spaceId && u.AccountType == "Guest").ToList();
            var sanitizedGuestUsersEntities = _mapper.Map<IEnumerable<SanitizedGuestUserDto>>(guestUsersEntities); 
            return sanitizedGuestUsersEntities;
        }

        public void DeleteGuestUser(Guid spaceId, Guid userId)
        {
            _databaseUtils.CheckIfSpaceExists(spaceId);
            var user = _context.Users.FirstOrDefault(u => u.Id == userId && u.SpaceId == spaceId);
            
            if (user is null) {
                throw new NotFoundException("Nie odnaleziono użytkownika");
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}
