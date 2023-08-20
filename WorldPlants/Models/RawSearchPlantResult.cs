using Newtonsoft.Json;

namespace WorldPlants.Models
{
    public class RawSearchPlantResult
    {
        public int Id { get; set; }
        [JsonProperty("common_name")]
        public string CommonName { get; set; }
        [JsonProperty("scientific_name")]
        public string[] ScientificName { get; set; }
        [JsonProperty("other_name")]
        public string[] OtherName { get; set; }
        public string Watering { get; set; }
        public string[] Sunlight { get; set; }
        [JsonProperty("default_image")]
        public DefaultPlantImage DefaultImage { get; set; }
    }

    public class DefaultPlantImage
    {
        public string Thumbnail { get; set; }
    }
}
