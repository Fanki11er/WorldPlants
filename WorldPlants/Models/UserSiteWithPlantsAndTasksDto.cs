// Ignore Spelling: Dto

using WorldPlants.Entities;

namespace WorldPlants.Models
{
    public class UserSiteWithPlantsAndTasksDto
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; }
        public List<PlantPictureNameNumberOfTasksDto> Plants { get; set; } = new List<PlantPictureNameNumberOfTasksDto>();

    }
}
