namespace WorldPlants.Entities
{
    public class PlantNote
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public string ImageUrl { get; set; }
        public string CreationDate { get; set; }
        public Guid PlantId { get; set; }
    }
}
