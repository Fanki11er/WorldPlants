using WorldPlants.Enums;

namespace WorldPlants.Entities
{
    public class ActiveTask
    {
        public Guid Id { get; set; }
        public DateTime ActionDate { get; set; }
        public PartOfTheDay PartOfTheDay { get; set; }
        public ActionType ActionType { get; set; }
        public string Description { get; set; }
        public int? Interval { get; set; }
        public virtual Plant Plant { get; set; }
        public Guid PlantId { get; set; }

    }
}
