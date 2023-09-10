// Ignore Spelling: dto

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Enums;
using WorldPlants.Exceptions;
using WorldPlants.Models;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{

    public interface ISiteService
    {
        public List<UserSiteWithPlantsAndTasksDto> GetUserSitesWithPlants();
        //public SiteWithPlantsDto GetSiteWithPlants(int siteId);
        public List<SiteWithIdAndNameDto> GetDefaultSites();
        public List<SunExposureDto> GetSunExposures(int locationId);
        public List<SunExposureDto> GetSunExposuresByLocation(int locationId);
        public int AddNewUserSite(NewUserSiteDto dto);
        public GetSiteBeforeDeleteInformationDto GetBeforeDeleteSiteInfo(int siteId);
        public void DeleteUserSite(int siteId);
        public GetUserSiteSettingsDto GetSiteSettings(int siteId);
        public void EditUserSite(int siteId, EditUserSiteSettingsDto dto);
        public List<PlantBasicInformationDto> GetSitePlants(int siteId);
    }
    public class SitesService : ISiteService
    {
        private readonly IUserContextService _userContextService;
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUtilities _utilities;
        private readonly IImageService _imageService;

        public SitesService(
            IUserContextService userContextService, 
            WorldPlantsDbContext dbContext, 
            IMapper mapper, 
            IUtilities utilities,
            IImageService imageService
            )
        {
            _userContextService = userContextService;
            _dbContext = dbContext;
            _mapper = mapper;
            _utilities = utilities;
            _imageService = imageService;
        }

        public List<UserSiteWithPlantsAndTasksDto> GetUserSitesWithPlants()
        {
            var userSpaceId = _utilities.GetUserSpaceId();

            var userSites = _dbContext.UserSites.Include(i => i.Plants).ThenInclude(p => p.ActiveTasks)
                .Where(us => us.SpaceId.ToString() == userSpaceId).ToList();

            var userSiteDtos = userSites.Select(site => new UserSiteWithPlantsAndTasksDto
            {
                SiteId = site.Id,
                SiteName = site.Name,
                Plants = site.Plants.Select(plant => new PlantPictureNameNumberOfTasksDto
                {
                    Id = plant.Id.ToString(),
                    Name = plant.Name,
                    NumberOfTasks = plant.ActiveTasks.Count,
                    ImageUrl = _imageService.GetImageUrl(plant.ImageName)
                }).ToList()
            }).ToList();

            return userSiteDtos;

        }

        /*public SiteWithPlantsDto GetSiteWithPlants(int siteId)
        {
            var site = GetUserSiteWithPlantsAndActiveTasks(siteId);

            var siteWithPlantsDto = new SiteWithPlantsDto()
            {
                Id = site!.Id,
                Name = site.Name,
                Plants = site.Plants.Select(p => new PlantBasicInformationDto
                {
                    Id = p.Id.ToString(),
                    Name = p.Name,

                    ImageUrl = p.ImageName,
                    TasksInformation = p.ActiveTasks.Select(t => new ActiveTaskInformationDto()
                    {
                        IsDelayed = false,
                        Name = "We will addd it later"
                    }).ToList(),

                }).ToList()
            };
            return siteWithPlantsDto;
        }*/

        public List<PlantBasicInformationDto> GetSitePlants(int siteId)
        {
            var sitePlants = new List<PlantBasicInformationDto>();

            var site = GetUserSiteWithPlantsAndActiveTasks(siteId);

           foreach (var plant in site.Plants)
            {
                var plantInormation = _mapper.Map<PlantBasicInformationDto>(plant);

                var shortTermTasks = plant.ActiveTasks.Where(d => (DateOnly.FromDateTime(d.ActionDate).DayNumber - DateOnly.FromDateTime(DateTime.UtcNow).DayNumber) <= 7);

                var tasks = _mapper.Map<List<ActiveTaskInformationDto>>(shortTermTasks);

                if(tasks != null) {
                    plantInormation.TasksInformation.AddRange(tasks);
                }

                plantInormation.ImageUrl = _imageService.GetImageUrl(plant.ImageName);

                sitePlants.Add(plantInormation);

            }

            return sitePlants;
        }

        public List<SiteWithIdAndNameDto> GetDefaultSites()
        {
            var result = _dbContext.DefaultSites
                .Select(s => new SiteWithIdAndNameDto { Id = s.Id, Name = s.Name, Location = s.Location.ToString() }).ToList();

            return result;
        }

        public List<SunExposureDto> GetSunExposures(int siteId)
        {

            var site = GetDefaultUserSite(siteId);

            var sunExposures = _dbContext.SunExposures.Where(e => ((int)e.ForSiteType) == (int)site.Location);

            var result = _mapper.Map<List<SunExposureDto>>(sunExposures);

            return result;
        }

        public List<SunExposureDto> GetSunExposuresByLocation(int locationId)
        {

            if (!Enum.IsDefined(typeof(Locations), locationId))
            {
                throw new BadRequestException("Nie prawidłowa nazwa lokalizacji");
            }

            var sunExposures = _dbContext.SunExposures.Where(e => (int)e.ForSiteType == locationId);

            var result = _mapper.Map<List<SunExposureDto>>(sunExposures);

            return result;
        }

        public int AddNewUserSite(NewUserSiteDto dto)
        {
            User user = _utilities.GetUserWithSettings();

            _utilities.CheckForUserPermission(user.UserSettings.CanAddSites);

            DefaultSite defaultSite = GetDefaultUserSite(dto.DefaultSiteId);

            SunExposure? sunExposure = _dbContext
                .SunExposures
                .FirstOrDefault(se => se.Id == dto.SunExposureId) ??
                throw new NotFoundException("Nie znaleziono expozycji na światło");

            UserSite newUserSite = CreateUserSite(defaultSite, dto, sunExposure);

            var entity = _dbContext.UserSites.Add(newUserSite);

            _utilities.SaveChangesToDatabase("Nie udało się dodać miejsca");

            return entity.Entity.Id;
        }

        public GetSiteBeforeDeleteInformationDto GetBeforeDeleteSiteInfo(int siteId)
        {
            var userSite = GetUserSiteWithPlants(siteId);

            GetSiteBeforeDeleteInformationDto dto = _mapper.Map<GetSiteBeforeDeleteInformationDto>(userSite);

            return dto;
        }

        public void DeleteUserSite(int siteId)
        {
            User user = _utilities.GetUserWithSettings();

            _utilities.CheckForUserPermission(user.UserSettings.CanRemoveSites);

            var userSite = GetUserSiteWithPlants(siteId);

            _dbContext.Remove(userSite!);

            _utilities.SaveChangesToDatabase("Nie udało się usunąć miejsca");
        }

        public GetUserSiteSettingsDto GetSiteSettings(int siteId)
        {
            var userSite = GetUserSite(siteId);

            var userSettingsDto = _mapper.Map<GetUserSiteSettingsDto>(userSite);

            return userSettingsDto;
        }

        public void EditUserSite(int siteId, EditUserSiteSettingsDto dto)
        {

            User user = _utilities.GetUserWithSettings();

            _utilities.CheckForUserPermission(user.UserSettings.CanEditSites);

            var userSite = GetUserSite(siteId);

            foreach (var setting in dto.GetType().GetProperties())
            {
                var propsertyName = setting.Name;

                if (userSite!.GetType().GetProperty(propsertyName) != setting)
                {
                    var propertyValue = setting.GetValue(dto);
                    userSite!.GetType()?.GetProperty(propsertyName)?.SetValue(userSite, propertyValue);
                }
            }

            _dbContext.Update(userSite!);

            _utilities.SaveChangesToDatabase("Nie udało się zmienić ustawień dla miejsca");
        }

        // Helper functions

        private void CheckIfUserSiteExists(UserSite? userSite)
        {
            if (userSite == null)
            {
                throw new UserSiteNotFoundException("Nie odnaleziono przestrzeni o podanym id");
            }
        }

        private void CheckIfSiteBelongsToUserSpace(UserSite userSite, string userSpaceId)
        {
            if (userSite.SpaceId.ToString() != userSpaceId)
            {
                throw new ForbidException("To miejsce nie należy do aktualnej przestrzeni użytkownika");
            }
        }

        private UserSite GetUserSite(int siteId)
        {
            var userSite = _dbContext.UserSites
                .FirstOrDefault(s => s.Id == siteId);

            CheckIfUserSiteExists(userSite);

            var spaceId = _utilities.GetUserSpaceId();

            CheckIfSiteBelongsToUserSpace(userSite!, spaceId);

            return userSite!;
        }

        private DefaultSite GetDefaultUserSite(int siteId)
        {
            DefaultSite? defaultSite = _dbContext
               .DefaultSites
               .FirstOrDefault(s => s.Id == siteId) ??
               throw new NotFoundException("Nie znaleziono wzorca miejsca dla rośliny");

            var spaceId = _utilities.GetUserSpaceId();

            return defaultSite;
        }

        private UserSite GetUserSiteWithPlants(int siteId)
        {
            var userSite = _dbContext.UserSites
                .Include(i => i.Plants)
                .FirstOrDefault(s => s.Id == siteId);

            CheckIfUserSiteExists(userSite);

            var spaceId = _utilities.GetUserSpaceId();

            CheckIfSiteBelongsToUserSpace(userSite!, spaceId);

            return userSite!;
        }

        private UserSite GetUserSiteWithPlantsAndActiveTasks(int siteId)
        {
            var userSite = _dbContext.UserSites
                .Include(i => i.Plants)
                .ThenInclude(i => i.ActiveTasks)
                .FirstOrDefault(s => s.Id == siteId);

            CheckIfUserSiteExists(userSite);

            var spaceId = _utilities.GetUserSpaceId();

            CheckIfSiteBelongsToUserSpace(userSite!, spaceId);

            return userSite!;
        }

        private UserSite CreateUserSite(DefaultSite defaultSite, NewUserSiteDto dto, SunExposure sunExposure)
        {
            var userSpaceId = _utilities.GetUserSpaceId();

            UserSite newUserSite = _mapper.Map<UserSite>(defaultSite);

            if (dto.Name != "")
            {
                newUserSite.Name = dto.Name;
            }

            if (newUserSite.CanChangeHasRoof)
            {
                newUserSite.HasRoof = dto.HasRoof;
            }

            newUserSite.SpaceId = new Guid(userSpaceId!.ToString());

            newUserSite.SunExposure = sunExposure;

            return newUserSite;
        }

    }
}
