namespace WorldPlants.Models.ActiveTasksModels
{
    public class PlantWithTasksDTO
    {
        public string PlantId { get; set; }
        public string PlantName { get; set;}
        public string UserSiteId { get; set; }
        public string UserSiteName { get; set; }
        public string? PlantPhoto { get; set; }
        public List<ActiveTaskInformationDto> PlantTasks { get; set; } = new List<ActiveTaskInformationDto>();
    }
}
