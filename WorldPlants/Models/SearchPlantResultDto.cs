// Ignore Spelling: Dto

using Newtonsoft.Json;
using WorldPlants.Utilities;

namespace WorldPlants.Models
{
    public class SearchPlantResultDto
    {
        public int Id { get; set; }
        public string CommonName { get; set; }
        public string[] ScientificName { get; set; }
        public string Watering { get; set; }
        public List<string> Sunlight { get; set; }
        public string DefaultImage { get; set; }
    }
}
