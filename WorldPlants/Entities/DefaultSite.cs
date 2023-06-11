using WorldPlants.Enums;

namespace WorldPlants.Entities
{
    public class DefaultSite
    {
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
}
