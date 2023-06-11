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
                .Where(us => us.UserSpaceId.Equals(userSpaceId)).ToList();

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

    }
}
