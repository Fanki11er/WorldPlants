using WorldPlants.Entities;
using WorldPlants.Enums;

namespace WorldPlants.DbSeeders
{
    public class DbSeeder
    {
        private readonly WorldPlantsDbContext _dbContext;

        public DbSeeder(WorldPlantsDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        public void Seed()
        {


            if (_dbContext.Database.CanConnect())
            {


                if (!_dbContext.SunExposures.Any())
                {
                    var sunExposures = GetSunExposures();
                    _dbContext.SunExposures.AddRange(sunExposures);
                    _dbContext.SaveChanges();

                }

                if (!_dbContext.DefaultSites.Any())
                {
                    var defaultSites = GetDefaultSites();
                    _dbContext.DefaultSites.AddRange(defaultSites);
                    _dbContext.SaveChanges();

                }
            }
        }

        private IEnumerable<SunExposure> GetSunExposures()
        {
            var sunExposures = new List<SunExposure>()
            {
                // 1
                new SunExposure {
                    Name = "Ciemno",
                    Description = "Całkowity brak słóńca/Na przykład łazienka bez okien",
                    ForSiteType = Locations.Indor,
                    SunScale = SunScale.None,
                },
                //2
                new SunExposure {
                    Name = "Cień",
                    Description =  "Ciemny pokój z małą ilością światła/Na przykład ciemna sypialnia lub miejsce z dala od okna/Okna wychodzące na północ",
                    ForSiteType = Locations.Indor,
                    SunScale = SunScale.Low,
                },
                //3
                 new SunExposure {
                    Name = "Słońce / Cień",
                    Description = "Zwykłe nasłonecznienie dla większości pomieszczeń/Miejsce nie daleko od okna/Okna wychodzące na wschód",
                    ForSiteType = Locations.Indor,
                    SunScale = SunScale.Medium,
                },
                //4
                new SunExposure {
                    Name = "Pełne słóńce",
                    Description = "Słoneczny jasny pokój/Np pomieszczenie nasłonecznione przez większość dnia/Okna wychodzące na południe",
                    ForSiteType = Locations.Indor,
                    SunScale = SunScale.High,
                },
                //5
                new SunExposure {
                    Name = "Cień",
                    Description =   "Zacienione miejsce, niewiele słóńca/Np balkon po północnej stronie/Okna wychodzące na południe",
                    ForSiteType = Locations.Outdor,
                    SunScale = SunScale.Low,
                },
                //6
                new SunExposure {
                    Name = "Słońce / Cień",
                    Description = "Poranne słońce, miejsce przesłonięte/Słońce przez pewną cześć dnia/Np balkon po stronie wschodniej lib zachodniej",
                    ForSiteType = Locations.Outdor,
                    SunScale = SunScale.Medium,
                },
                //7
                new SunExposure {
                    Name = "Pełne Słońce",
                    Description =  "Słonecznie miejsce/Słońce przez przynajmniej 8 godzin/ Miejsce po południowej stronie lub otwarta przestrzeń",
                    ForSiteType = Locations.Outdor,
                    SunScale = SunScale.High,
                },

            };
            return sunExposures;
        }

        private IEnumerable<DefaultSite> GetDefaultSites()
        {
            var defaultSites = new List<DefaultSite>()
            {
                new DefaultSite()
                {
                    Name = "Sypialnia",
                    Location = Locations.Indor,
                    WarmPeriodMinTemperature = 20,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = 15,
                    ColdPeriodMaxTemperature = 25,
                    HasRoof = true,
                },

                new DefaultSite()
                {
                    Name = "Salon",
                    Location = Locations.Indor,
                    WarmPeriodMinTemperature = 20,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = 15,
                    ColdPeriodMaxTemperature = 25,
                    HasRoof = true,
                },

                new DefaultSite()
                {
                    Name = "Biuro",
                    Location = Locations.Indor,
                    WarmPeriodMinTemperature = 20,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = 15,
                    ColdPeriodMaxTemperature = 25,
                    HasRoof = true,
                },

                new DefaultSite()
                {
                    Name = "Łazienka",
                    Location = Locations.Indor,
                    WarmPeriodMinTemperature = 20,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = 15,
                    ColdPeriodMaxTemperature = 25,
                    HasRoof = true,
                },

                new DefaultSite()
                {
                    Name = "Kuchnia",
                    Location = Locations.Indor,
                    WarmPeriodMinTemperature = 20,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = 15,
                    ColdPeriodMaxTemperature = 25,
                    HasRoof = true,
                },
                new DefaultSite()
                {
                    Name = "Korytarz",
                    Location = Locations.Indor,
                    WarmPeriodMinTemperature = 20,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = 15,
                    ColdPeriodMaxTemperature = 25,
                    HasRoof = true,
                    CanChangeHasRoof = false
                },

                new DefaultSite()
                {
                    Name = "Taras",
                    Location = Locations.Outdor,
                    WarmPeriodMinTemperature = 12,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = -20,
                    ColdPeriodMaxTemperature = 10,
                    HasRoof = true,
                    CanChangeHasRoof = true,
                },

                new DefaultSite()
                {
                    Name = "Balkon",
                    Location = Locations.Outdor,
                    WarmPeriodMinTemperature = 12,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = -20,
                    ColdPeriodMaxTemperature = 10,
                    HasRoof = true,
                    CanChangeHasRoof = true,
                },
                new DefaultSite()
                {
                    Name = "Ganek",
                    Location = Locations.Outdor,
                    WarmPeriodMinTemperature = 12,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = -20,
                    ColdPeriodMaxTemperature = 10,
                    HasRoof = true,
                    CanChangeHasRoof = true,
                },

                new DefaultSite()
                {
                    Name = "Ogród",
                    Location = Locations.Outdor,
                    WarmPeriodMinTemperature = 12,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = -20,
                    ColdPeriodMaxTemperature = 10,
                    HasRoof = true,
                    CanChangeHasRoof = true,
                },
                new DefaultSite()
                {
                    Name = "Działka",
                    Location = Locations.Outdor,
                    WarmPeriodMinTemperature = 12,
                    WarmPeriodMaxTemperature = 36,
                    ColdPeriodMinTemperature = -20,
                    ColdPeriodMaxTemperature = 10,
                    HasRoof = true,
                    CanChangeHasRoof = true,
                },

             };
            return defaultSites;

        }

    }
}
