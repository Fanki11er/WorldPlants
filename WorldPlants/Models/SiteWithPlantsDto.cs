// Ignore Spelling: Dto

namespace WorldPlants.Models
{
    public class SiteWithPlantsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PlantBasicInformationDto> Plants { get; set; }
    }
}
