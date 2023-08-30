// Ignore Spelling: Dto

namespace WorldPlants.Models
{
    public class PlantBasicInformationDto
    {
       public string Id { get; set; }
       public string Name { get; set; }   
       public string? ImageUrl { get; set; }
       public List<ActiveTaskInformationDto> TasksInformation { get; set; }
    }
}
