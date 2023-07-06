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
        //public DbSet<Task> TasksHistory { get; set; }

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

           /* modelBuilder.Entity<Plant>(eb =>
            {
                eb.HasMany(at => at.ActiveTasks).WithOne(p => p.Plant);
                eb.HasMany(at => at.TasksHistory).WithOne(p=> p.Plant);
            });*/

           /* modelBuilder.Entity<Announcement>(eb =>
            {
                eb.Property(an => an.Value).IsRequired();
                //eb.Property(an => an.AnnouncementType).IsRequired();

            });



            modelBuilder.Entity<Class>(eb =>
            {
                eb.Property(cl => cl.Name).IsRequired().HasMaxLength(2);
                eb.HasMany(cl => cl.Students).WithOne(st => st.StudentClass);
                eb.HasOne(cl => cl.Program).WithMany(pr => pr.Classs);
                eb.HasMany(cl => cl.ClassAnnouncements).WithOne(ca => ca.Class);
            });


            modelBuilder.Entity<Grade>(eb =>
            {
                eb.Property(gr => gr.Value).IsRequired();
                eb.Property(gr => gr.Date).IsRequired();
                eb.Property(gr => gr.Date).HasDefaultValueSql("getutcdate()");
                eb.HasOne(gr => gr.Subject).WithMany(su => su.Grades).OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Subject>(eb =>
            {
                eb.Property(su => su.Name).IsRequired().HasMaxLength(50);
                eb.HasMany(su => su.ProgramSubjects).WithOne(gr => gr.Subject);


            });


            modelBuilder.Entity<Teacher>(eb =>
            {
                eb.HasMany(tr => tr.SupervisingClasses).WithOne(cl => cl.SupervisingTeacher);
                eb.HasOne(tr => tr.Subject).WithOne(su => su.Teacher).HasForeignKey<Teacher>(tr => tr.SubjectId);
            });

            modelBuilder.Entity<Program>(eb =>
            {
                eb.HasMany(pr => pr.ProgramSubjects).WithOne(su => su.Program);
            });*/


        }
    }
}
