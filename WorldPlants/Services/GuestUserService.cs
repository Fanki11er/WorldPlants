﻿// Ignore Spelling: dto

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utilities;
using WorldPlants.Utils;

namespace WorldPlants.Services
{
    public interface IGuestUserService
    {
        public void RegisterGuestUser(RegisterUserDto dto);
        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers();
        public void SelfDeleteGuestUser();
        public void DeleteGuestUser(string userId);
        public void ChangeGuestUserStatus(ChangeGuestUserStatusDto dto);
        public GuestUserWithPermissionsDto GetGuestUserPermissions(string userId);

        public void ChangeGuestUserPermissions(string userId, GuestUserPermissions newPermissions);
    };
    public class GuestUserService : IGuestUserService
    {
        private readonly WorldPlantsDbContext _context;
        private readonly IDatabaseUtils _databaseUtils;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;
        private readonly IUtilities _Utilities;
        public GuestUserService(WorldPlantsDbContext context, IDatabaseUtils databaseUtils, IMapper mapper, IUserContextService userContextService, IUtilities Utilities)
        {
            _context = context;
            _databaseUtils = databaseUtils;
            _mapper = mapper;
            _userContextService = userContextService;
            _Utilities = Utilities;
        }
        public void RegisterGuestUser(RegisterUserDto dto)
        {
            string accountType = UserRoles.Guest.ToString();

            bool hasPhoneNumber = dto.PhoneNumber != null && dto.PhoneNumber != "";

            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var userId = _databaseUtils.AddUserToDatabase(dto, new Guid(spaceId), accountType);

            _databaseUtils.AddToDatabaseUserSettings(accountType, userId, hasPhoneNumber);
        }

        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers()
        {

            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var guestUsersEntities = _context
                .Users
                .Where(u => u.SpaceId.ToString() == spaceId && u.AccountType == UserRoles.Guest.ToString())
                .ToList();

            var sanitizedGuestUsersEntities = _mapper.Map<IEnumerable<SanitizedGuestUserDto>>(guestUsersEntities);

            return sanitizedGuestUsersEntities;
        }

        public GuestUserWithPermissionsDto GetGuestUserPermissions(string userId)
        {
            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var user = _context.Users.Include(i => i.UserSettings).FirstOrDefault(u => u.Id.ToString() == userId && u.SpaceId.ToString() == spaceId);

            CheckIfUserExists(user);

            var permissions = _mapper.Map<GuestUserPermissions>(user!.UserSettings);

            GuestUserWithPermissionsDto guestUserWithPermissionsDto = new()
            {
                Id = user.Id,
                Name = user.Name,
                GuestUserPermissions = permissions
            };

            return guestUserWithPermissionsDto;
        }

        public void DeleteGuestUser(string userId)
        {
            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId && u.SpaceId.ToString() == spaceId);

            CheckIfUserExists(user);

            _context.Users.Remove(user!);

            _Utilities.SaveChangesToDatabase("Nie udało się usunąć użytkownika");

        }

        public void SelfDeleteGuestUser()
        {
            var user = _Utilities.GetUser();

            _context.Users.Remove(user);

            _Utilities.SaveChangesToDatabase("Nie udało się usunąć użytkownika");
        }

        public void ChangeGuestUserStatus(ChangeGuestUserStatusDto dto)
        {
            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var user = _context.Users
                .FirstOrDefault(u => u.Id.ToString() == dto.UserId && u.SpaceId.ToString() == spaceId);

            CheckIfUserExists(user);

            user!.IsActive = dto.NewStatus;

            _context.Update(user);

            _Utilities.SaveChangesToDatabase("Nie udało się zmienić statusu");

        }

        public void ChangeGuestUserPermissions(string userId, GuestUserPermissions newPermissions)
        {
            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var user = _context.Users
                .AsSplitQuery()
                .Include(i => i.UserSettings)
                .FirstOrDefault(u => u.Id.ToString() == userId && u.SpaceId.ToString() == spaceId);

            CheckIfUserExists(user);

            var settings = user!.UserSettings;

            foreach (var permission in newPermissions.GetType().GetProperties())
            {
                var propsertyName = permission.Name;

                if (user.UserSettings.GetType().GetProperty(propsertyName) != permission)
                {
                    var propertyValue = permission.GetValue(newPermissions);

                    user.UserSettings.GetType()?.GetProperty(propsertyName)?.SetValue(settings, propertyValue);
                }
            }

            _context.Update(settings);

            _Utilities.SaveChangesToDatabase("Nie udało się usunąć użytkownika");

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

        private void CheckIfUserExists(User? user)
        {
            if (user is null)
            {
                throw new NotFoundException("Nie odnaleziono użytkownika");
            }
        }
    }
}
