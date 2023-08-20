// Ignore Spelling: Dto

using WorldPlants.Utilities;

namespace WorldPlants.Models.PlantsModels
{
    public class PlantDetailsDto
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string[] ScientificName { get; set; }
        public string[] OtherName { get; set; }
        public string DefaultImage { get; set; }
        public PropertyWithInformation Watering { get; set; }
        public List<PropertyWithInformation> Sunlight { get; set; }
        public PropertyWithInformation PlantType { get; set; }
        public float AverageHeight { get; set; }
    }
}
