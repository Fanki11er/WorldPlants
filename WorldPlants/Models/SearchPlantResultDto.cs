using Newtonsoft.Json;
using WorldPlants.Utilities;

namespace WorldPlants.Models
{
    public class SearchPlantResultDto
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string[] ScientificName { get; set; }
        public string[] OtherName { get; set; }
        public PropertyWithInformation Watering { get; set; }
        public List<PropertyWithInformation> Sunlight { get; set; }
        public string DefaultImage { get; set; }
    }
}
