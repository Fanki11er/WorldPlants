namespace WorldPlants.Entities
{
    public class Space
    {
        public Guid Id { get; set; }
        public virtual IEnumerable<User> Users { get; set; }
    }
}
