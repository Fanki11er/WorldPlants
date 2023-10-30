namespace WorldPlants.Models.PlantTaskHistory
{
    public class PlantTaskHistoryDTO
    {
        public int Id { get; set; }
        public string TaskType { get; set; }
        public string TaskName { get; set; }
        public string UserName { get; set; }
        public string ExecutionDate { get; set; }
    }
}
