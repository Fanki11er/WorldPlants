// Ignore Spelling: Dto

using WorldPlants.Utilities;

namespace WorldPlants.Models.PlantsModels
{
    public class PlantDetailsDto
    {
        public int Id { get; set; }
        public string? CommonName { get; set; }
        public string[] ScientificName { get; set; }
        public string[] OtherName { get; set; }
        public string? DefaultImage { get; set; }
        public string? Watering { get; set; }
        public List<string> Sunlight { get; set; }
        public string? PlantType { get; set; }
        public float? AverageHeight { get; set; }
        public string? LifeCycle { get; set; }
        public string? WateringPeriod { get; set; }
        public PlantDetailsWateringGeneralBenchmark? WateringGeneralBenchmark { get; set; }
    }
}
