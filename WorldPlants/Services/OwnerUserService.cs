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
        private readonly IUtilities _utilities;
        private readonly IImageService _imageService;

        public OwnerUserService(
            IDatabaseUtils databaseUtils, 
            WorldPlantsDbContext context, 
            IUserContextService userContextService, 
            IUtilities utilities,
            IImageService imageService
            )
        {
            _databaseUtils = databaseUtils;
            _context = context;
            _userContextService = userContextService;
            _utilities = utilities;
            _imageService = imageService;

        }
        public void RegisterOwnerUser(RegisterUserDto dto)
        {
            string accountType = UserRoles.Owner.ToString();
            bool hasPhoneNumber = dto.PhoneNumber != null;


            var spaceId = _databaseUtils.AddToDatabaseUserSpace();

            _databaseUtils.CheckIfSpaceExists(spaceId.ToString());

            var userId = _databaseUtils.AddUserToDatabase(dto, spaceId, accountType);

            _databaseUtils.AddToDatabaseUserSettings(accountType, userId, hasPhoneNumber);
        }

        public void DeleteUserAndAppAccount()
        {
            var userId = _userContextService.GetUserId;

            var spaceId = _userContextService.GetSpaceId;

            if (spaceId == null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            var space = _context.Spaces
                .AsSplitQuery()
                .Include(i => i.Users)
                .ThenInclude(i => i.UserSettings)
                .AsSplitQuery()
                .Include(i => i.UserSites)
                .ThenInclude(i => i.Plants)
                .FirstOrDefault(s => s.Id.ToString() == spaceId);

            if (space == null)
            {
                throw new NotFoundException("Nie znaleziono przestrzeni uzytkownika");
            }

            if (userId is null)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            var isUserSpaceOwner = _context.Users.Any(s => s.Id.ToString() == userId && s.SpaceId.ToString() == spaceId);

            if (!isUserSpaceOwner)
            {
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            }

            List<string> images = new();

            foreach( var site in space.UserSites ) {

                var plantsImages = site.Plants
                    .Where( p => p.ImageName != null)
                    .Select(p => p.ImageName);
                
                images.AddRange(plantsImages!);
            }

            _context.Spaces.Remove(space);

            _utilities.SaveChangesToDatabase("Nie udało się usunąć przestrzeni");

            foreach(var image in  images)
            {
                _imageService.DeleteImage(image);
            }
        }

    }
}
