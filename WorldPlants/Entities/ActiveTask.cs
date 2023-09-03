using Microsoft.EntityFrameworkCore.Storage;

namespace WorldPlants.Entities
{
    public class ActiveTask
    {
        public Guid Id { get; set; }
        public DateTime ActionDate { get; set; }
        public string PartOfTheDay { get; set; }
        public string Name { get; set; }
        public virtual Plant Plant { get; set; }
        public Guid PlantId { get; set; }

    }
}
