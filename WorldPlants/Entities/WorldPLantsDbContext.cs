using Microsoft.EntityFrameworkCore;

namespace WorldPlants.Entities
{
    public class WorldPLantsDbContext: DbContext
    {
        public WorldPLantsDbContext(DbContextOptions<WorldPLantsDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserSettings> UserSettings { get; set; }
        public DbSet<Space> Spaces { get; set; }
    }
}
