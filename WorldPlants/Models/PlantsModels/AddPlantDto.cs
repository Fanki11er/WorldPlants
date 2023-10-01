// Ignore Spelling: Dto

using Newtonsoft.Json;

namespace WorldPlants.Models.PlantsModels
{
    public class AddPlantDto
    {
        public string Name { get; set; }
        public int? ExternalId { get; set; }
        public string? ImageUrl { get; set; }
        public int PotWidth { get; set; }
        public int PotHeight { get; set;}
        public int PlantHeight { get; set;}
        public string? AdditionalDescription { get; set;}
        public IFormFile? ImageFile { get; set; }
    }
}
