// Ignore Spelling: Dto

namespace WorldPlants.Models
{
    public class GetUserSiteSettingsDto
    {
        public string Name { get; set; }
        public int WarmPeriodMinTemperature { get; set; }
        public int WarmPeriodMaxTemperature { get; set; }
        public int ColdPeriodMinTemperature { get; set; }
        public int ColdPeriodMaxTemperature { get; set; }
        public bool HasRoof { get; set; }
        public bool CanChangeHasRoof { get; set; }
        public int Location { get; set; }
        public int SunExposureId { get; set; }
    }
}
