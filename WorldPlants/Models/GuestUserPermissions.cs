namespace WorldPlants.Models
{
    public class GuestUserPermissions
    {
        public bool CanMovePlants { get; set; }
        public bool CanAddPlants { get; set; }
        public bool CanRemovePlants { get; set; }
        public bool CanEditPlants { get; set; }
        public bool CanAddSites { get; set; }
        public bool CanRemoveSites { get; set; }
        public bool CanEditSites { get; set; }
        public bool CanAddCustomTasks { get; set;}
    }
}
