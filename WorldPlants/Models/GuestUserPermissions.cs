namespace WorldPlants.Models
{
    public class GuestUserPermissions
    {
        public bool CanWaterPlants { get; set; }
        public bool CanMistPlants { get; set; }
        public bool CanFertilizePlants { get; set; }
        public bool CanReplantPlants { get; set; }
        public bool CanCutPlants { get; set; }
        public bool CanMovePlants { get; set; }
        public bool CanAddPlants { get; set; }
        public bool CanRemovePlants { get; set; }
        public bool CanEditPlants { get; set; }
        public bool CanAddSites { get; set; }
        public bool CanRemoveSites { get; set; }
        public bool CanEditSites { get; set; }
    }
}
