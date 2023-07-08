using WorldPlants.Entities;
using WorldPlants.Enums;

namespace WorldPlants.Models
{
    public class EditUserSiteDto
    {
        public string? Name { get; set; }
        public int WarmPeriodMinTemperature { get; set; }
        public int WarmPeriodMaxTemperature { get; set; }
        public int ColdPeriodMinTemperature { get; set; }
        public int ColdPeriodMaxTemperature { get; set; }
        public int SunExposureId { get; set; }
    }
}
