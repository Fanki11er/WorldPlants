namespace WorldPlants.Entities
{
    public class Plant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; } = "";
        public int UserSiteId { get; set; }
        public virtual UserSite UserSite { get; set; }
        public virtual List<ActiveTask> ActiveTasks { get; set; }
    }
}
