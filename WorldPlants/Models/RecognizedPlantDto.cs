// Ignore Spelling: Dto

namespace WorldPlants.Models
{
    public class RecognizedPlantDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Probability { get; set;}
        public string Description { get; set;}
        public List<string> Images { get; set; }
    }
}
