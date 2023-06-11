namespace WorldPlants.Entities
{
    public class Task
    {
        public int Id { get; set; }
       // public int TaskTypeId { get; set; }
       // public TaskType TaskType{ get; set; }
        public DateTime DueDate { get; set; }
        public virtual Plant Plant { get; set; }
        public int PlantId { get; set; }
    }
}
