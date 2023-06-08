namespace WorldPlants.Entities
{
    public class UserSettings
    {
        public Guid Id { get; set; }
        public bool ReceiveEmails { get; set; }
        public bool ReceiveSms { get; set; }
        public bool CanWaterPlants { get; set; }
        public bool CanMistPlants { get; set; }
        public bool CanFertilizePlants { get; set; }
        public bool CanRepotPlants { get; set; }
        public bool CanMovePlants { get; set; }
        public bool CanAddPlants { get; set; }
        public bool CanRemovePlants { get; set;}
        public bool CanEditPlants { get; set; }
        public virtual User User { get; set; }
        public Guid UserId { get; set; }

    }
}
