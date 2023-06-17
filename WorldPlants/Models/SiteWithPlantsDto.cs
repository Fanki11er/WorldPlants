namespace WorldPlants.Models
{
    public class SiteWithPlantsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<PlantInformationDto> Plants { get; set; }
    }
}
