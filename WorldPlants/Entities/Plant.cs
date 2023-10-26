namespace WorldPlants.Entities
{
    public class Plant
    {
        public Guid Id { get; set; }
        public int? ExternalId { get; set; }
        public string Name { get; set; }
        public string? AdditionalDescription { get; set; }
        public int PotWidth { get; set; }
        public int PotHeight { get; set; }
        public int PlantHeight { get; set; }
        public string? ImageName { get; set; }
        public int UserSiteId { get; set; }
        public virtual UserSite UserSite { get; set; }
        public virtual List<ActiveTask> ActiveTasks { get; set; }
        public virtual List<PlantTaskHistory> TasksHistory { get; set; }
        public virtual List<PlantNote> PlantNotes { get; set; }
    }
}
