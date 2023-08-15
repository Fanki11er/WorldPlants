﻿using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Services;

namespace WorldPlants.Utilities
{
    public interface IUtilities
    {
        public void CheckForUserPermission(bool permission);
        public User GetUser();
        public string GetUserSpaceId();
        public void SaveChangesToDatabase(string errorMessage = "Nie udało się zapisać do bazy");
        public User GetUserWithSettings();
    }

    public class Utilities : IUtilities
    {
        private readonly IUserContextService _userContextService;
        private readonly WorldPlantsDbContext _dbContext;

        public Utilities(WorldPlantsDbContext worldPlantsDbContext, IUserContextService userContextService)
        {
            _dbContext = worldPlantsDbContext;
            _userContextService = userContextService;
        }

        public Utilities()
        {

        }
        public void CheckForUserPermission(bool permission)
        {
            if (permission == false)
            {
                throw new ActionAccessPermittedException("Brak uprawnień do wykonania akcji");
            }
        }

        public User GetUser()
        {
            var userId = _userContextService
                .GetUserId ?? 
                throw new ForbidException("Brak uprawnień do wykonania akcji");
            
            var user = _dbContext
                .Users
                .FirstOrDefault(u => u.Id.ToString() == userId) ?? 
                throw new NotFoundException("Nie odnaleziono użytkownika");
            
            return user;
        }

        public User GetUserWithSettings()
        {
            string userId = _userContextService
                .GetUserId ?? 
                throw new ForbidException("Brak uprawnień do wykonania akcji");

            var user = _dbContext
                .Users
                .Include(i => i.UserSettings)
                .FirstOrDefault(u => u.Id.ToString() == userId) ?? 
                throw new NotFoundException("Nie odnaleziono użytkownika");

            return user;
        }

        public string GetUserSpaceId()
        {
            var userSpaceId = _userContextService
                .GetSpaceId ?? 
                throw new UserSiteNotFoundException("Nie odnaleziono przestrzeni użytkownika");
            
            return userSpaceId;
        }

        public void SaveChangesToDatabase(string errorMessage = "Nie udało się zapisać do bazy")
        {
            var changesCounter = _dbContext.SaveChanges();

            if (changesCounter == 0)
            {
                throw new NotUpdatedException(errorMessage);
            }
        }

    }

}
