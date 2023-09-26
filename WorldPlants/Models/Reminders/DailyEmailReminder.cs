namespace WorldPlants.Models.Reminders
{

    public class DailyEmailReminder
    {
        public string Subject { get; set; } = string.Empty;

        public List<DailyPlantEmailReminder> Data = new(); 
    }

    public class DailyPlantEmailReminder
    {
        public string PlantName { get; set; }
        public string LinkToPlantTasks { get; set; }
        public List<TodayTask> TodayTasks { get; set; } = new List<TodayTask>();
    }

    public class TodayTask
    {
        public string ActionType  { get; set; }
        public string PartOfTheDay { get; set; }
        public int DaysLate { get; set; }


    }

}
