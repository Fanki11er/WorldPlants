namespace WorldPlants.Entities
{
    public class ActiveTask
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int DaysLeft { get; set; }
        public int DelayDays { get; set; }
        public virtual Plant Plant { get; set; }
        public Guid PlantId { get; set; }

    }
}
