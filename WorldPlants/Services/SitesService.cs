using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models;

namespace WorldPlants.Services
{

    public interface ISiteService
    {
        public List<UserSiteWithPlantsAndTasksDto> GetUserSitesWithPlants();
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
                    imageUrl = ""
                }).ToList()
            }).ToList();

            return userSiteDtos;

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
                SpaceId = new Guid(userSpaceId),
            };

            _dbContext.UserSites.Add(newUserSite);
            _dbContext.SaveChanges();
            

        }



    }
}

/*
 SqlException: The INSERT statement conflicted with the FOREIGN KEY constraint "FK_DefaultSites_Spaces_SpaceId". The conflict occurred in database "WorldPlantsDb", table "dbo.Spaces", column 'Id'.
 */
/*
  public class UserSite: DefaultSite
    {
        public SunExposure SunExposure { get; set; }
        public  Guid UserSpaceId { get; set; }
        public Space Space { get; set; }
        public IEnumerable<Plant> Plants { get; set; }

 public int Id { get; set; }
        public string Name { get; set; }
        public Locations Location { get; set; }
        public int WarmPeriodMinTemperature { get; set; }
        public int WarmPeriodMaxTemperature { get; set; }
        public int ColdPeriodMinTemperature { get; set; }
        public int ColdPeriodMaxTemperature { get; set; }
        public bool HasRoof { get; set; }
        public bool CanChangeHasRoof { get; set;}


    }
 */