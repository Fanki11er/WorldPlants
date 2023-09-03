using WorldPlants.Entities;
using WorldPlants.Enums;

namespace WorldPlants.Models.ActiveTasksModels
{
    public class ActiveTaskDTO
    {
        public string Id { get; set; }
        public string ActionDate { get; set; }
        public string PartOfTheDay { get; set; }
        public string ActionType { get; set; }
        public string Description { get; set; }
        public int? Interval { get; set; }
        public string PlantId { get; set; }
    }
}
