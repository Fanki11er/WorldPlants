using Microsoft.EntityFrameworkCore;

namespace WorldPlants.Entities
{
    public class WorldPlantsDbContext: DbContext
    {
        public WorldPlantsDbContext(DbContextOptions<WorldPlantsDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserSettings> UserSettings { get; set; }
        public DbSet<Space> Spaces { get; set; }
        public DbSet<SunExposure> SunExposures { get; set; }
        public DbSet<DefaultSite> DefaultSites { get; set; }
        public DbSet<UserSite> UserSites { get; set; }
        public DbSet<Plant> Plants { get; set; }
        public DbSet<ActiveTask> ActiveTasks { get; set; }
        public DbSet<PlantTaskHistory> PlantTasksHistory { get; set; }
        public DbSet<QrCode> QrCodes { get; set; }
        public DbSet<PlantNote> PlantNotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(eb =>
            {
                eb.HasOne(u => u.UserSettings)
                .WithOne(s => s.User).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<UserSite>(eb =>
            {
                eb.HasOne(s => s.Space).WithMany(sp => sp.UserSites).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Space>(eb =>
            {
                eb.HasMany(eb => eb.UserSites).WithOne(s => s.Space).OnDelete(DeleteBehavior.Cascade);
                eb.HasMany(eb => eb.Users).WithOne(u => u.Space).OnDelete(DeleteBehavior.Cascade);
            });

        }
    }
}
