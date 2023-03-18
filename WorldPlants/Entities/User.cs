namespace WorldPlants.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; } = true;
        public string AccountType { get; set; }
        public virtual UserSettings UserSettings { get; set; }
        public virtual Space Space { get; set; }

    }
}
