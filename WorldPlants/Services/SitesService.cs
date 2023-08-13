﻿// Ignore Spelling: dto

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;

namespace WorldPlants.Services
{

    public interface ISiteService
    {
        public List<UserSiteWithPlantsAndTasksDto> GetUserSitesWithPlants();
        public SiteWithPlantsDto GetSiteWithPlants(int siteId);
        public List<SiteWithIdAndNameDto> GetDefaultSites();
        public List<SunExposureDto> GetSunExposures(int locationId);
        public int AddNewUserSite(NewUserSiteDto dto);
        public void DeleteUserSite(int siteId);

        public void EditUserSite(EditUserSiteDto dto);
    }
    public class SitesService : ISiteService
    {
        private readonly IUserContextService _userContextService;
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IMapper _mapper;

        public SitesService(IUserContextService userContextService, WorldPlantsDbContext dbContext, IMapper mapper)
        {
            _userContextService = userContextService;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public List<UserSiteWithPlantsAndTasksDto> GetUserSitesWithPlants()
        {
            var userSpaceId = _userContextService.GetSpaceId;

            CheckIfUserSpaceIdIsNotNull(userSpaceId!);

            var userSites = _dbContext.UserSites.Include(i => i.Plants).ThenInclude(p => p.ActiveTasks)
                .Where(us => us.SpaceId.ToString() == userSpaceId).ToList();

            var userSiteDtos = userSites.Select(site => new UserSiteWithPlantsAndTasksDto
            {
                SiteId = site.Id,
                SiteName = site.Name,
                Plants = site.Plants.Select(plant => new PlantPictureNameNumberOfTasksDto
                {
                    Id = plant.Id,
                    Name = plant.Name,
                    NumberOfTasks = plant.ActiveTasks.Count,
                    ImageUrl = ""
                }).ToList()
            }).ToList();

            return userSiteDtos;

        }

        public SiteWithPlantsDto GetSiteWithPlants(int siteId)
        {
            var site = _dbContext.UserSites.Include(i => i.Plants).ThenInclude(i => i.ActiveTasks).FirstOrDefault(s => s.Id == siteId);

            CheckIfUserSiteExists(site);

            var siteWithPlantsDto = new SiteWithPlantsDto()
            {
                Id = site.Id,
                Name = site.Name,
                Plants = site.Plants.Select(p => new PlantInformationDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    SiteName = p.Name,
                    NumberOfTasks = p.ActiveTasks.Count,
                    ImageUrl = p.ImageURL,
                    TasksInformation = p.ActiveTasks.Select(t => new ActiveTaskInformationDto()
                    {
                        IsDelayed = false,
                        Name = "We will addd it later"
                    }).ToList(),

                }).ToList()
            };
            return siteWithPlantsDto;
        }

        public List<SiteWithIdAndNameDto> GetDefaultSites()
        {
            var result = _dbContext.DefaultSites
                .Select(s => new SiteWithIdAndNameDto { Id = s.Id, Name = s.Name, Location = s.Location.ToString() }).ToList();

            return result;
        }

        public List<SunExposureDto> GetSunExposures(int siteId)
        {

            var site = _dbContext.DefaultSites.FirstOrDefault(s=> s.Id == siteId);
            if (site == null)
            {
                throw new NotFoundException("Nie odnaleziono prototypu miejsca");
            }

            var sunExposures = _dbContext.SunExposures.Where(e => ((int)e.ForSiteType) == (int)site.Location);

            var result = _mapper.Map<List<SunExposureDto>>(sunExposures);

            return result;
        }

        public int AddNewUserSite(NewUserSiteDto dto)
        {

            var userSpaceId = _userContextService.GetSpaceId;

            CheckIfUserSpaceIdIsNotNull(userSpaceId);

            DefaultSite? defaultSite = _dbContext.DefaultSites.FirstOrDefault(s => s.Id == dto.DefaultSiteId);

            if (defaultSite == null)
            {
                throw new NotFoundException("Nie znaleziono wzorca miejsca dla rośliny");
            }

            SunExposure? sunExposure = _dbContext.SunExposures.FirstOrDefault(se => se.Id == dto.SunExposureId);

            if (sunExposure == null)
            {
                throw new NotFoundException("Nie znaleziono expozycji na światło");
            }

            UserSite newUserSite = new()
            {
                Name = dto.Name != "" ? dto.Name : defaultSite.Name,
                SunExposure = sunExposure,
                Location = defaultSite.Location,
                WarmPeriodMinTemperature = defaultSite.WarmPeriodMinTemperature,
                WarmPeriodMaxTemperature = defaultSite.WarmPeriodMaxTemperature,
                ColdPeriodMinTemperature = defaultSite.ColdPeriodMinTemperature,
                ColdPeriodMaxTemperature = defaultSite.ColdPeriodMaxTemperature,
                HasRoof = defaultSite.Location == Enums.Locations.Indoor? defaultSite.HasRoof : dto.HasRoof,
                CanChangeHasRoof = defaultSite.CanChangeHasRoof,
                SpaceId = new Guid(userSpaceId!.ToString()),
            };

            var entity = _dbContext.UserSites.Add(newUserSite);
            int changesCounter =  _dbContext.SaveChanges();

            if(changesCounter == 0)
            {
                throw new NotUpdatedException("Nie udało się dodać miejsca");
            }

            return entity.Entity.Id;
        }

        public void DeleteUserSite(int siteId)
        {
            var userSpaceId = _userContextService.GetSpaceId;

            CheckIfUserSpaceIdIsNotNull(userSpaceId);

            var userSite = _dbContext.UserSites.Include(i => i.Plants).FirstOrDefault(s => s.Id == siteId);

            CheckIfUserSiteExists(userSite);

            CheckIfUserIsOwnerOfSite(userSite!, userSpaceId!);

            if (userSite!.Plants.Any())
            {
                throw new SiteWithPlantsException("Nie możesz usunąć przestrzeni jeśli znajdują się w niej rośliny");
            }

            _dbContext.Remove(userSite);
            _dbContext.SaveChanges();

        }

        public void EditUserSite(EditUserSiteDto dto)
        {
            var userSpaceId = _userContextService.GetSpaceId;

            CheckIfUserSpaceIdIsNotNull(userSpaceId);

            var userSite = _dbContext.UserSites.FirstOrDefault(s => s.Id == dto.Id);

            CheckIfUserSiteExists(userSite);

            CheckIfUserIsOwnerOfSite(userSite!, userSpaceId!);

            //  userSite.ColdPeriodMinTemperature = dto.ColdPeriodMinTemperature;
            // userSite.ColdPeriodMaxTemperature = dto.ColdPeriodMaxTemperature;
            // userSite.WarmPeriodMinTemperature = dto.WarmPeriodMinTemperature;
            // userSite.WarmPeriodMaxTemperature = dto.WarmPeriodMaxTemperature;
            userSite!.Name = dto.Name!;
            // userSite.SunExposureId = dto.SunExposureId;
            _dbContext.Update(userSite);
            var wtf = _dbContext.SaveChanges();

        }


        private void CheckIfUserSpaceIdIsNotNull(string? userSpaceId)
        {
            if (userSpaceId == null)
            {
                throw new UserSiteNotFoundException("Nie odnaleziono przestrzeni użytkownika");
            }
        }

        private void CheckIfUserSiteExists(UserSite? userSite)
        {
            if (userSite == null)
            {
                throw new UserSiteNotFoundException("Nie odnaleziono przestrzeni o podanym id");
            }
        }

        private void CheckIfUserIsOwnerOfSite(UserSite userSite, string userSpaceId)
        {
            if (userSite.SpaceId.ToString() != userSpaceId)
            {
                throw new ForbidException("Nie jesteś właścicielem przestrzeni o podanym id");
            }
        }
    }
}
