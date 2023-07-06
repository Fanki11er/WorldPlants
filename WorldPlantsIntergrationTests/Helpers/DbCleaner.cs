using Microsoft.EntityFrameworkCore;
using WorldPlants.Entities;

namespace WorldPlantsIntergrationTests.Helpers
{
    public class DbCleaner
    {
        public void ClearDatabase(WorldPlantsDbContext dbContext)
        {
            var usres = dbContext.Users;
            var spaces = dbContext.Spaces;
            var sites = dbContext.UserSites;
            var settings = dbContext.UserSettings;
            dbContext.Users.RemoveRange(usres);
            dbContext.Spaces.RemoveRange(spaces);
            dbContext.UserSites.RemoveRange(sites);
            dbContext.UserSettings.RemoveRange(settings);
            dbContext.SaveChanges();
        }

    }
}
