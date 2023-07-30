using Microsoft.EntityFrameworkCore;
using System.Linq;
using WorldPlants.Entities;

namespace WorldPlantsIntergrationTests.Helpers
{
    public class DbCleaner
    {
        public void ClearDatabase(WorldPlantsDbContext dbContext)
        {
            var usres = dbContext.Users.ToList();
            var spaces = dbContext.Spaces.ToList();
            var sites = dbContext.UserSites.ToList();
            var settings = dbContext.UserSettings.ToList();
            var sunExposures = dbContext.SunExposures.ToList();
            dbContext.Users.RemoveRange(usres);
            dbContext.Spaces.RemoveRange(spaces);
            dbContext.UserSites.RemoveRange(sites);
            dbContext.UserSettings.RemoveRange(settings);
            dbContext.SunExposures.RemoveRange(sunExposures);
            dbContext.SaveChanges();
        }

    }
}
