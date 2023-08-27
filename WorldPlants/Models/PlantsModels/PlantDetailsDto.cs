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
        public List<string> PruningMonth { get; set; }
        public RawPlantDetailsPruningCount? PruningCount { get; set; }
        public string? CareLevel { get; set; }
        public string? GrowthRate { get; set; }
        public string? FloweringSeason { get; set; }
        public string? HarvestSeason { get; set; }
        public bool? PoisonousToHumans { get; set; }
        public bool? PoisonousToPets { get; set; }
        public bool? Fruits { get; set; }
        public bool? EdibleFruits { get; set; }
        public bool? DroughtTolerant { get; set; }
        public bool? Invasive { get; set; }
        public bool? Indoor { get; set; }
        public string? Description { get; set; }

    }
}
