namespace WorldPlants.Entities
{
    public class ActionType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid SpaceId { get; set; }
        public bool StandardType { get; set; }
    }
}
