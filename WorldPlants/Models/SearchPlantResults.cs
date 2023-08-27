using Newtonsoft.Json;

namespace WorldPlants.Models
{
    public class RawSearchPlantResultsData
    {
        [JsonProperty("data")]
        public RawSearchPlantResult[] Data { get; set; }
    }
}
