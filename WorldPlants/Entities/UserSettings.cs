namespace WorldPlants.Entities
{
    public class UserSettings
    {
        public Guid Id { get; set; }
        public bool ReceiveEmails { get; set; }
        public bool CanWaterPlants { get; set; }
        public bool CanMistPlants { get; set; }
        public bool CanFertilizePlants { get; set; }
        public bool CanRepotPlants { get; set; }
        public bool CanMovePlants { get; set; }
        public bool AddPlants { get; set; }
        public bool RemovePlants { get; set;}
        public bool EditPlants { get; set; }

    }
}
