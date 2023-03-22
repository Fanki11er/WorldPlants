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
        public void RegisterGuestUser(RegisterUserDto dto);
        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers();
        public void DeleteGuestUser(string userId);
    };
    public class GuestUserService : IGuestUsertService
    {
        private readonly WorldPLantsDbContext _context;
        private readonly IDatabaseUtils _databaseUtils;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public GuestUserService(WorldPLantsDbContext context, IDatabaseUtils databaseUtils, IMapper mapper, IUserContextService userContextService)
        {
            _context = context;
            _databaseUtils = databaseUtils;
            _mapper = mapper;
            _userContextService = userContextService;
        }
        public void RegisterGuestUser(RegisterUserDto dto)
        {
            string accountType = "Guest";

            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var userId = _databaseUtils.AddUserToDatabase(dto, new Guid(spaceId), accountType);

            _databaseUtils.AddToDatabaseUserSettings(accountType, userId);
        }

        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers() {

            var spaceId = CheckIfSpaceIdIsNotNull();
            _databaseUtils.CheckIfSpaceExists(spaceId);
            var guestUsersEntities = _context.Users.Where(u => u.SpaceId.ToString() == spaceId && u.AccountType == "Guest").ToList();
            var sanitizedGuestUsersEntities = _mapper.Map<IEnumerable<SanitizedGuestUserDto>>(guestUsersEntities); 
            return sanitizedGuestUsersEntities;
        }

        public void DeleteGuestUser(string userId)
        {
            var spaceId = CheckIfSpaceIdIsNotNull();
            _databaseUtils.CheckIfSpaceExists(spaceId);
            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId && u.SpaceId.ToString() == spaceId);
            
            if (user is null) {
                throw new NotFoundException("Nie odnaleziono użytkownika");
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        private string CheckIfSpaceIdIsNotNull()
        {
            var spaceId = _userContextService.GetSpaceId;

            if (spaceId is null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }
            return spaceId;
        }
    }
}
