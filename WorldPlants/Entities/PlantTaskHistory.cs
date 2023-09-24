using WorldPlants.Enums;

namespace WorldPlants.Entities
{
    public class PlantTaskHistory
    {
        public int Id { get; set; }
        public ActionType TaskType { get; set; }
        public string UserName { get; set; }
        public string ExecutionDate { get; set; }
        public Guid PlantId { get; set; }
        public virtual Plant Plant { get; set; }
    }
}
