﻿// Ignore Spelling: Dto

using WorldPlants.Entities;
using WorldPlants.Enums;

namespace WorldPlants.Models
{
    public class EditUserSiteSettingsDto
    {
        public string Name { get; set; }
        public int WarmPeriodMinTemperature { get; set; }
        public int WarmPeriodMaxTemperature { get; set; }
        public int ColdPeriodMinTemperature { get; set; }
        public int ColdPeriodMaxTemperature { get; set; }
        public bool HasRoof { get; set; }
        public int SunExposureId { get; set; }
    }
}
