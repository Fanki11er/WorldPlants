namespace WorldPlants.Models
{
    public class ActiveTaskInformationDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public int DelayDays { get; set; }
        public int DaysLeft { get; set; }
    }
}
