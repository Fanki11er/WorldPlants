﻿// Ignore Spelling: dto

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utils;

namespace WorldPlants.Services
{
    public interface IGuestUserService
    {
        public void RegisterGuestUser(RegisterUserDto dto);
        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers();
        public void DeleteGuestUser(string userId);
        public void ChangeGuestUserStatus(ChangeGuestUserStatusDto dto);
    };
    public class GuestUserService : IGuestUserService
    {
        private readonly WorldPlantsDbContext _context;
        private readonly IDatabaseUtils _databaseUtils;
        private readonly IMapper _mapper;
        private readonly IUserContextService _userContextService;

        public GuestUserService(WorldPlantsDbContext context, IDatabaseUtils databaseUtils, IMapper mapper, IUserContextService userContextService)
        {
            _context = context;
            _databaseUtils = databaseUtils;
            _mapper = mapper;
            _userContextService = userContextService;
        }
        public void RegisterGuestUser(RegisterUserDto dto)
        {
            string accountType = UserRoles.Geust.ToString();

            bool hasPhoneNumber = dto.PhoneNumber != null;

            var spaceId = CheckIfSpaceIdIsNotNull();

            _databaseUtils.CheckIfSpaceExists(spaceId);

            var userId = _databaseUtils.AddUserToDatabase(dto, new Guid(spaceId), accountType);

            _databaseUtils.AddToDatabaseUserSettings(accountType, userId, hasPhoneNumber);
        }

        public IEnumerable<SanitizedGuestUserDto> GetGuestUsers() {

            var spaceId = CheckIfSpaceIdIsNotNull();
            _databaseUtils.CheckIfSpaceExists(spaceId);
            var guestUsersEntities = _context.Users.Where(u => u.SpaceId.ToString() == spaceId && u.AccountType == UserRoles.Geust.ToString()).ToList();
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

        public void ChangeGuestUserStatus(ChangeGuestUserStatusDto dto)
        {
            var spaceId = CheckIfSpaceIdIsNotNull();
            _databaseUtils.CheckIfSpaceExists(spaceId);
            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == dto.UserId && u.SpaceId.ToString() == spaceId);

            if (user is null)
            {
                throw new NotFoundException("Nie odnaleziono użytkownika");
            }
            user.IsActive = dto.NewStatus;
            _context.Update(user);
            int changesCount =  _context.SaveChanges();

            if(changesCount == 0)
            {
                throw new NotUpdatedException("Nie udało się zmienić statusu");
            }

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
