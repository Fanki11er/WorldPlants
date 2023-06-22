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
        public void AddNewUserSite(NewUserSiteDto dto);
    }
    public class SitesService : ISiteService
    {
        private readonly IUserContextService _userContextService;
        private readonly WorldPlantsDbContext _dbContext;

        public SitesService(IUserContextService userContextService, WorldPlantsDbContext dbContext)
        {
            _userContextService = userContextService;
            _dbContext = dbContext;
        }

        public List<UserSiteWithPlantsAndTasksDto> GetUserSitesWithPlants()
        {
            var userSpaceId = _userContextService.GetSpaceId;

            if (userSpaceId == null)
            {
                throw new UserSiteNotFoundException("Nie odnaleziono przestrzeni użytkownika");
            }

            var userSites = _dbContext.UserSites.Include(i => i.Plants).ThenInclude(p => p.ActiveTasks) 
                .Where(us => us.SpaceId.Equals(userSpaceId)).ToList();

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
            var site = _dbContext.UserSites.Include(i => i.Plants).ThenInclude(i=> i.ActiveTasks).FirstOrDefault(s => s.Id == siteId);
            if(site == null)
            {
                throw new UserSiteNotFoundException("Nie odznaleziono przestrzeni uzytkownika");
            }
            var siteWithPlantsDto = new SiteWithPlantsDto()
            {
                Id = site.Id,
                Name = site.Name,
                Plants = site.Plants.Select(p => new PlantInformationDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    SiteName = p.Name,
                    NumberOfTasks= p.ActiveTasks.Count,
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
                .Select(s => new SiteWithIdAndNameDto { Id = s.Id, Name = s.Name , Location = (int)s.Location}).ToList();
            
            return result;
        }

        public List<SunExposureDto> GetSunExposures(int locationId)
        {
            var result = _dbContext.SunExposures.Where(e=> ((int)e.ForSiteType) == locationId)
                .Select(se => new SunExposureDto { Id = se.Id, Name = se.Name, Description = se.Description }).ToList();
            return result;
        }

        public void AddNewUserSite(NewUserSiteDto dto)
        {

            var userSpaceId = _userContextService.GetSpaceId;

            if(userSpaceId == null)
            {
                throw new UserSiteNotFoundException("Nie odnaleziono przestrzeni użytkownika");
            }

            DefaultSite? defaultSite = _dbContext.DefaultSites.FirstOrDefault(s => s.Id == dto.DefaultSiteId);

            if(defaultSite == null)
            {
                throw new NotFoundException("Nie znaleziono wzorca miejsca dla rośliny");
            }

            SunExposure? sunExposure = _dbContext.SunExposures.FirstOrDefault(se => se.Id == dto.SunExposureId);

            if (sunExposure == null)
            {
                throw new NotFoundException("Nie znaleziono expozycji na światło");
            }

            UserSite newUserSite = new UserSite()
            {
                Name = dto.Name != "" ? dto.Name : defaultSite.Name,
                SunExposure = sunExposure,
                Location = defaultSite.Location,
                WarmPeriodMinTemperature = defaultSite.WarmPeriodMinTemperature,
                WarmPeriodMaxTemperature = defaultSite.WarmPeriodMaxTemperature,
                ColdPeriodMinTemperature = defaultSite.ColdPeriodMinTemperature,
                ColdPeriodMaxTemperature = defaultSite.ColdPeriodMaxTemperature,
                HasRoof = defaultSite.HasRoof,
                CanChangeHasRoof = defaultSite.CanChangeHasRoof,
                SpaceId = new Guid(userSpaceId.ToString()),
            };

            _dbContext.UserSites.Add(newUserSite);
            _dbContext.SaveChanges();
            

        }



    }
}
