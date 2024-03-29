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
        public Plant FindPlant(string plantId);
        public Plant FindPlantWithTasks(string plantId);
        public TimeZoneInfo GetPolishTimezone();
        public DateOnly GetTodayDate();
        public DateTime GetTodayDateTime();
        public Plant FindPlantWithTasksHistory(string plantId);
        public void CheckIfUserSiteExists(int siteId);
        public Plant FindPlantWithNotes(string plantId);
        public void DeletePlantNotesImages(string plantId);
        public string FirstLetterToUpper(string input);
    }

    public class Utilities : IUtilities
    {
        private readonly IUserContextService _userContextService;
        private readonly IImageService _imageService;
        private readonly WorldPlantsDbContext _dbContext;

        public Utilities(WorldPlantsDbContext worldPlantsDbContext,
            IUserContextService userContextService,
            IImageService imageService
            )
        {
            _dbContext = worldPlantsDbContext;
            _userContextService = userContextService;
            _imageService = imageService;
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
                .AsSplitQuery()
                .Include(i => i.UserSettings)
                .FirstOrDefault(u => u.Id.ToString() == userId)
                ??
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

        public Plant FindPlant(string plantId)
        {
            var spaceId = GetUserSpaceId();

            var plant = _dbContext.Plants
               .AsSplitQuery()
               .Include(p => p.UserSite)
               .FirstOrDefault(p => p.Id.ToString() == plantId &&
               p.UserSite.SpaceId.ToString() == spaceId)
               ?? throw new NotFoundException($"Nie znaleziono rośliny o id: {plantId}");

            return plant;
        }

        public Plant FindPlantWithTasks(string plantId)
        {
            var spaceId = GetUserSpaceId();

            var plant = _dbContext
               .Plants
               .AsSplitQuery()
               .Include(p => p.UserSite)
               .AsSplitQuery()
               .Include(p => p.ActiveTasks)
               .ThenInclude(t => t.ActionType)
               .FirstOrDefault(p => p.Id.ToString() == plantId &&
               p.UserSite.SpaceId.ToString() == spaceId)
               ?? throw new NotFoundException($"Nie znaleziono rośliny o id: {plantId}");

            return plant;
        }

        public Plant FindPlantWithTasksHistory(string plantId)
        {
            var spaceId = GetUserSpaceId();

            var plant = _dbContext
               .Plants
               .AsSplitQuery()
               .Include(p => p.TasksHistory)
               .AsSplitQuery()
               .Include(i => i.UserSite)
               .FirstOrDefault(p => p.Id.ToString() == plantId &&
               p.UserSite.SpaceId.ToString() == spaceId)
               ?? throw new NotFoundException($"Nie znaleziono rośliny o id: {plantId}");

            return plant;
        }

        public Plant FindPlantWithNotes(string plantId)
        {
            var spaceId = GetUserSpaceId();

            var plant = _dbContext
               .Plants
               .AsSplitQuery()
               .Include(p => p.PlantNotes)
               .AsSplitQuery()
               .Include(i => i.UserSite)
               .FirstOrDefault(p => p.Id.ToString() == plantId &&
               p.UserSite.SpaceId.ToString() == spaceId)
               ?? throw new NotFoundException($"Nie znaleziono rośliny o id: {plantId}");

            return plant;
        }

        public TimeZoneInfo GetPolishTimezone()
        {
            var timezone = TimeZoneInfo
                .FindSystemTimeZoneById("Central European Standard Time")
                ?? throw new TimeZoneNotFoundException("Nie odnaleziono ustawień strefy czasowej");

            return timezone;
        }

        public DateOnly GetTodayDate()
        {
            var timezone = GetPolishTimezone();

            var today = DateOnly.FromDateTime(TimeZoneInfo.ConvertTime((DateTime.Today), timezone));

            return today;
        }

        public DateTime GetTodayDateTime()
        {
            var timezone = GetPolishTimezone();

            var today = TimeZoneInfo.ConvertTime((DateTime.Today), timezone);


            return today;
        }

        public void CheckIfUserSiteExists(int siteId)
        {
            var exists = _dbContext.UserSites.Any(s => s.Id == siteId);

            if (!exists)
            {
                throw new NotFoundException("Nie znaleziono miejsca o podanym id");
            }
        }

        public void DeletePlantNotesImages(string plantId)
        {
            var plant = FindPlantWithNotes(plantId);

            foreach (var plantNote in plant.PlantNotes)
            {
                _imageService.DeleteImage(plantNote.ImageUrl);

                plantNote.ImageUrl = null;
            }
        }

        public string FirstLetterToUpper(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return string.Empty;
            }
            return $"{input[0].ToString().ToUpper()}{input[1..]}";
        }


    }

}
