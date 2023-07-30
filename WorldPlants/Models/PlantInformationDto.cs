using WorldPlants.Entities;

namespace WorldPlants.Models
{
    public class PlantInformationDto: PlantPictureNameNumberOfTasksDto
    {
        public List<ActiveTaskInformationDto> TasksInformation { get; set; }
        public string SiteName { get; set; }
    }
}
